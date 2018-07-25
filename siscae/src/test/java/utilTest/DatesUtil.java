package utilTest;

import java.util.Date;

import org.joda.time.DateTime;
import org.junit.Test;

public class DatesUtil
{
    @Test
    public void test()
    {
        long time = System.currentTimeMillis();
        DateTime date = new DateTime(time);
        System.out.println(date.toDate());
        System.out.println(date.toString("yyyy-MM-dd"));
    }

   
}