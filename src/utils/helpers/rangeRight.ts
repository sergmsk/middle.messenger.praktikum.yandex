import range from './range';
/**
 * Создаем последовательность чисел range в обратном порядке
 * @param start
 * @param end
 * @param step
 * @returns {*[]}
 */
export default (start: number, end: number, step: number): number[] => range(start, end, step, true);