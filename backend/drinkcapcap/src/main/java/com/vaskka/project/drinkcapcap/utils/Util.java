package com.vaskka.project.drinkcapcap.utils;


import java.sql.Timestamp;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

/**
 * @program: drinkcapcap
 * @description: Util
 * @author: Vaskka
 * @create: 2019/3/19 1:44 PM
 **/

public class Util {

    private static SimpleDateFormat getSimpleDateFormat() {
        return new SimpleDateFormat("yyyy-MM-dd");
    }

    /**
     * 获取今天黎明时 Timestamp
     * @return Timestamp
     * @throws ParseException 解析异常
     */
    public static Timestamp getTodayDawn() throws ParseException {
        SimpleDateFormat sf = getSimpleDateFormat();


        long today = sf.parse(sf.format(new Date())).getTime();

        return new Timestamp(today);
    }


    /**
     * 获取明天黎明时 Timestamp
     * @return Timestamp
     * @throws ParseException 解析异常
     */
    public static Timestamp getTommorrowDawn() throws ParseException {

        SimpleDateFormat sf = getSimpleDateFormat();

        Calendar calendar = Calendar.getInstance();

        calendar.add(Calendar.DATE, 1);

        Date tomorrow = calendar.getTime();

        return new Timestamp(sf.parse(sf.format(tomorrow.getTime())).getTime());
    }

    /**
     * 检查是否过期
     * @param createTime create time stamp
     * @param effectTime effect time (hour)
     * @return boolean
     */
    public static boolean checkIfValid(Timestamp createTime, Integer effectTime) {
        Calendar calendar  = Calendar.getInstance();
        calendar.setTime(createTime);

        calendar.add(Calendar.HOUR, effectTime);

        return !calendar.before(Calendar.getInstance());
    }
}
