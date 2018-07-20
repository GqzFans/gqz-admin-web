export default class DateUtil {
    /**
     * 时间格式化 e.g. var testDate = new Date( 1320336000000 );//这里必须是整数，毫秒
     *
     * var testStr1 = DateUtil.format(testDate, "yyyy年MM月dd日HH小时mm分ss秒"); var
     * testStr2 = DateUtil.format(testDate, "yyyy-MM-dd HH:mm:ss.S"); var testStr3 =
     * DateUtil.format(testDate, "yyyy-MM-dd HH:mm:ss"); alert(testStr1);
     * alert(testStr2); alert(testStr3);
     * @param date
     * @param format
     * @returns
     * @author suihonghua
     */
    format(date, format) {
        try {
            // Y年MM月dd日 HH小时mm分ss秒
            let o = {
                'M+': date.getMonth() + 1, // month
                'd+': date.getDate(), // day
                'H+': date.getHours(), // hour
                'm+': date.getMinutes(), // minute
                's+': date.getSeconds(), // second
                'q+': Math.floor((date.getMonth() + 3) / 3), // quarter
                'S': date.getMilliseconds()// millisecond
            };
            if (/(y+)/.test(format)) {
                format = format.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
            }
            for (let k in o) {
                if (new RegExp('(' + k + ')').test(format)) {
                    format = format.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length));
                }
            }
            return format;
        } catch (e) {
            return '';
        }
    }
    parse(val) {
        if (typeof (val) === 'number') {
            return new Date(val);
        } else if (typeof (val) === 'string') {
            return new Date(Date.parse(val.replace(/-/g, '/')));
        }
        return null;
    }

}
