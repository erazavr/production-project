import { classNames } from './classNames';

describe('Test ClassNames', () => {
  test('with only first param', () => {
    const expected = 'someClass';
    expect(classNames('someClass')).toBe(expected);
  });
  test('with additional class', () => {
    const expected = 'someClass class1 class2';
    expect(classNames('someClass', {}, ['class1 class2'])).toBe(expected);
  });
  test('with mods', () => {
    const expected = 'someClass class1 class2 hovered selectable';
    expect(
      classNames('someClass', { hovered: true, selectable: true }, [
        'class1 class2',
      ]),
    ).toBe(expected);
  });
  test('with mods false', () => {
    const expected = 'someClass class1 class2 hovered';
    expect(
      classNames('someClass', { hovered: true, selectable: false }, [
        'class1 class2',
      ]),
    ).toBe(expected);
  });
  test('with mods undefined', () => {
    const expected = 'someClass class1 class2 hovered';
    expect(
      classNames('someClass', { hovered: true, selectable: undefined }, [
        'class1 class2',
      ]),
    ).toBe(expected);
  });
});
