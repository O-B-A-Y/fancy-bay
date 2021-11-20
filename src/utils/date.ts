import moment from 'moment';

class DateUtils {
  public static isNotReachDay(from: number, amount: number) {
    return moment.unix(from).add(amount, 'days').unix() > moment().unix();
  }
}
export default DateUtils;
