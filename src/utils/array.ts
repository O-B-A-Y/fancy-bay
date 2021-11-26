export default class ArrayUtils {
  /**
   * Merge and sort two arrays of objects on its single property (string or number)
   * Time complexity: O(N+M) where N is length of first array, M is the length of second array
   *
   * @param arr1 1st Array
   * @param arr2 2nd Array
   * @param property Object's property to be merged on
   * @returns Merged and sorted array
   */
  public static mergeOn(arr1: object[], arr2: object[], property: string) {
    const concatArr = arr1.concat(arr2);
    // If property is string
    const sortedArr = concatArr.sort((a: object, b: object) => {
      if (typeof a[property as keyof object] === 'string') {
        return (a[property as keyof object] as string).localeCompare(
          b[property as keyof object]
        );
      }
      if (typeof a[property as keyof object] === 'number') {
        return (
          (a[property as keyof object] as number) - b[property as keyof object]
        );
      }
      throw new Error(
        'ERROR! Unexpected type of object property. Only string and number are accepted'
      );
    });
    const mergedArr = [sortedArr[0]];
    let currValue = sortedArr[0][property as keyof object];
    for (let i = 1; i < sortedArr.length; i++) {
      if (currValue !== sortedArr[i][property as keyof object]) {
        mergedArr.push(sortedArr[i]);
        currValue = sortedArr[i][property as keyof object];
      }
    }
    return mergedArr;
  }

  /**
   * Mutate and prepend new element at the beginning of the array
   *
   * @param value Value to be prepended
   * @param array Array
   * @returns Prepended array
   */
  public static prepend(value: any, array: any[]) {
    array.unshift(value);
    return array;
  }
}
