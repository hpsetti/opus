/**
 * @author SwathiDivya Bhavaraju
 * @email swathidivya.bhavaraju@ul.com
 * @create date 2020-04-02 18:00:05
 * @modify date 2020-04-02 18:00:05
 * @desc [description]
 */
export default function wait(ms) {
  return (x) => new Promise((resolve) => setTimeout(() => resolve(x), ms));
}
