package list;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class Test {

	public List Info(){
		// TODO Auto-generated method stub
		Connection conn = null;
		PreparedStatement pstmt =null;
		ResultSet rs =null;
		
		String url = null;
		String id = "MEM_SJC";
		String pw ="MEM_SJCFlash1234";
		Map<String, Object> map;
		List<Map<String, Object>> list = new ArrayList<Map<String, Object>>();
		
		
		try
		{
			Class.forName("oracle.jdbc.driver.OracleDriver");
			
			try{
				url = "jdbc:oracle:thin:@1.234.19.244:1521:ORCL2";
				conn = DriverManager.getConnection(url,id,pw);
				System.out.println("db connect success");
				
				try{
					String sql ="SELECT COURSE_NAME, COURSE_START_DATE, COURSE_END_DATE,  GET_WEEK_STR(COURSE_WEEK), SCHEDULE_RECEIPT_FLAG FROM TL_COURSE";
					pstmt = conn.prepareStatement(sql);
				
					rs = pstmt.executeQuery();
					
					while(rs.next())
					{
						map = new HashMap<String, Object>();
						String COURSE_NAME = rs.getString(1);
						String COURSE_START_DATE = rs.getString(2);
						String COURSE_END_DATE = rs.getString(3);
						String COURSE_WEEK = rs.getString(4);
						String flag = rs.getString(5);
						String SCHEDULE_RECEIPT_FLAG = KR_FLAG(flag);
						
						String result = COURSE_NAME+" "+COURSE_START_DATE+" "+COURSE_END_DATE+" "+COURSE_WEEK+" "+SCHEDULE_RECEIPT_FLAG;
						
						System.out.println(result);
						
						map.put("COURSE_NAME", COURSE_NAME);
						map.put("COURSE_START_DATE", COURSE_START_DATE);
						map.put("COURSE_END_DATE", COURSE_END_DATE);
						map.put("COURSE_WEEK", COURSE_WEEK);
						map.put("SCHEDULE_RECEIPT_FLAG", SCHEDULE_RECEIPT_FLAG);
						
						list.add(map);
					}
					
				}catch(SQLException e){
					e.printStackTrace();
				}finally{
					try{
						if (rs != null){rs.close();}
						if (pstmt != null){pstmt.close();}
						if (conn != null){conn.close();}
					}catch(Exception e){
						throw new RuntimeException(e.getMessage());
					}
				}
				
			}
			
			catch(SQLException e){
				e.printStackTrace();
			}			
			
		}catch(ClassNotFoundException e){
			System.out.println(e);
		}
		return list;
		
	}

	public static String KR_FLAG(String flag){
		String rsFlag ="";
		
		if(flag.equals("Y")==true){
			rsFlag = "입금";
		}else{
			rsFlag = "미입금";
		}
		return rsFlag;
	}
	
}
