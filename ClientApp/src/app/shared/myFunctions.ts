export class MyFunction {
    public static swapArray<T>(array:T, i:number, step:number){
        let swap = array[i+step];
        array[i+step] = array[i];
        array[i] = swap;
      }
}
