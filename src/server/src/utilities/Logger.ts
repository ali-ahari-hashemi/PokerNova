export default class Logger {
  static log(content: any) {
    if (typeof content === 'object') {
      console.log(JSON.stringify(content));
    } else {
      console.log(content);
    }
  }
}
