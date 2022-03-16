import './index.scss';
import { ChatData, ChatMessage } from '../../api/ChatsAPI';
import ChatsController from '../../controllers/ChatsController';
import ModalController from '../../controllers/ModalController';
import UserController from '../../controllers/UserController';
import Block from '../../utils/Block';
import isArray from '../../utils/helpers/isArray';
import { Props } from '../../utils/types';
import ChatWS, { MessageResponse } from '../../webSocket/ChatWS';

let timer: ReturnType<typeof setTimeout>;
let inputValueOnModal = '';

export class MessengerPage extends Block {
  private ws: ChatWS | null;

  getStateFromProps(): void {
    const onMessage = (response: MessageResponse) => {
      ChatsController.addMessage(response.content);
      const totalMessages = isArray(response.content) ? (response.content as ChatMessage[]).length : 1;
      this.ws?.increaseOffsetBy(totalMessages);
    };

    this.state = {
      activePanelButtons: false,
      handleOpenModalCreateChat: () => {
        ModalController.modalOpen({
          active: true,
          title: 'Создать чат',
          data: {
            input: {
              name: 'nameChat',
              label: 'Название чата',
              placeholder: 'Введите название чата',
            },
            button: {
              name: 'createChat',
              label: 'Создать',
            },
          },
        });
      },
      handleModalClick: async (e: Event) => {
        const nameButton = (e.target as HTMLButtonElement).name;
        if (nameButton === 'close') {
          ModalController.modalClose();
        }

        if (inputValueOnModal.length > 3) {
          if (nameButton === 'createChat') {
            await ChatsController.createChat({
              title: inputValueOnModal,
            })
              .then(async () => {
                await ChatsController.fetchChats();
                ModalController.modalClose();
                inputValueOnModal = '';
              });
          }

          if (nameButton === 'addUser' || nameButton === 'deleteUser') {
            await UserController.searchUsers({
              login: inputValueOnModal,
            })
              .then(async (data) => {
                const foundUser = data?.find(({ login }: { login: string }) => login === inputValueOnModal);

                if (foundUser) {
                  if (nameButton === 'addUser') {
                    await ChatsController.addUsersInChat({
                      users: [(foundUser as Props).id],
                      chatId: (this.props as Props).chats.selectedChat.id,
                    });
                  }

                  if (nameButton === 'deleteUser') {
                    await ChatsController.deleteUsersInChat({
                      users: [(foundUser as Props).id],
                      chatId: (this.props as Props).chats.selectedChat.id,
                    });
                  }

                  await ChatsController.fetchChats();
                  await UserController.clearSearchUsers();
                }
              });

            ModalController.modalClose();
            inputValueOnModal = '';
          }
        }
      },
      handleModalChangeInput: (e: Event) => {
        inputValueOnModal = (e.target as HTMLInputElement).value;
      },
      handleChatOpenedClick: async (e: Event) => {
        const nameButton = (e.target as HTMLButtonElement).name;
        if (nameButton === 'openPanelButtons') {
          (this.state as Props).activePanelButtons = !(this.state as Props).activePanelButtons;
        }
        if (nameButton === 'openModalAddUser') {
          (this.state as Props).activePanelButtons = false;

          ModalController.modalOpen({
            active: true,
            title: 'Добавить пользователя',
            data: {
              input: {
                name: 'nameUser',
                label: 'Логин',
                placeholder: 'Введите логин пользователя',
              },
              button: {
                name: 'addUser',
                label: 'Добавить',
              },
            },
          });
        }
        if (nameButton === 'openModalDeleteUser') {
          (this.state as Props).activePanelButtons = false;

          ModalController.modalOpen({
            active: true,
            title: 'Удалить пользователя',
            data: {
              input: {
                name: 'nameUser',
                label: 'Логин',
                placeholder: 'Введите логин пользователя',
              },
              button: {
                name: 'deleteUser',
                label: 'Удалить',
              },
            },
          });
        }
        if (nameButton === 'sendMessage') {
          this.ws?.sendMessage(inputValueOnModal);
          inputValueOnModal = '';
        }
      },
      handleChatOpenedChangeInput: (e: Event) => {
        inputValueOnModal = (e.target as HTMLInputElement).value;
      },
      handleSelectUser: async (e: Event) => {
        const userId = Number((e.target as HTMLButtonElement).dataset.userId);
        const userLogin = (e.target as HTMLButtonElement).dataset.userLogin as string;

        await ChatsController.createChat({
          title: userLogin,
        });

        await ChatsController.fetchChats()
          .then(async (data) => {
            if (data?.length) {
              const newChat = data.find(({ title }: { title: string }) => title === userLogin);

              if (newChat) {
                await ChatsController.addUsersInChat({
                  users: [userId],
                  chatId: newChat.id,
                });
                await ChatsController.fetchChats();
              }
            }

            await UserController.clearSearchUsers();
          })
      },
      handleSelectChat: async (e: Event) => {
        const chatId = Number((e.target as HTMLButtonElement).dataset.chatId);
        const foundChat: ChatData = (this.props as Props).chats.allChats.find(({ id }: { id: number}) => id === chatId);

        ChatsController.setSelectedChat(foundChat);

        if (!this.ws) {
          this.ws = new ChatWS();
        }

        const response = await ChatsController.getToken({ chatId });
        const userId = (this.props as Props).user.profile.id;
        this.ws.shutdown();
        const path = `/${userId}/${chatId}/${response?.token}`;
        this.ws.setup(path, onMessage);
      },
      handleChangeInput: async (e: Event) => {
        const value: string = (e.target as HTMLInputElement).value;
        clearTimeout(timer);

        if (value.length > 1) {
          timer = await setTimeout(async () => {
            await UserController.searchUsers({
              login: value,
            });
          }, 800);
        }
      },
    }
  }

  componentDidMount(): void {
    this.ws = new ChatWS();
    if (!(this.props as Props).user.profile) {
      (this.props as Props).router.go('/');
    }

    if (!(this.props as Props).chats.allChats) {
      (async () => {
        await ChatsController.fetchChats();
      })();
    }
  }

  componentDidUpdate(): boolean {
    if (!(this.props as Props).user.profile) {
      (this.props as Props).router.go('/');
    }

    return true;
  }

  render(): string {
    // language=hbs
    return `
      <section id="messenger" class="messenger">
          <div class="chats">
              <div class="chats__header">
                  {{{
                      Button
                          label="Создать чат"
                          onClick=handleOpenModalCreateChat
                  }}}
                  {{{
                      Link
                          label="Профиль"
                          href="settings"
                  }}}
              </div>
              <div class="chats__search">
                  {{{
                      InputSearch
                          onChange=handleChangeInput
                  }}}
              </div>
              <div class="chats__wrapper">
                  {{#if this.user.search }}
                      {{#each this.user.search }}
                          {{{
                              ButtonUser
                                  item=this
                                  onClick=../handleSelectUser
                          }}}
                      {{/each}}
                  {{else}}
                      {{#each this.chats.allChats }}
                          {{{
                              Chat
                                  item=this
                                  onClick=../handleSelectChat
                          }}}
                      {{/each}}
                  {{/if}}
              </div>
          </div>
          {{{
              ChatOpened
                  item=this.chats.selectedChat
                  activePanelButtons=activePanelButtons
                  currentUser=this.user.profile
                  onClick=handleChatOpenedClick
                  onChange=handleChatOpenedChangeInput
          }}}
          {{{
              Modal
                  item=this.modal
                  onClick=handleModalClick
                  onChange=handleModalChangeInput
          }}}
      </section>
    `;
  }
}