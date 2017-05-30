package com.performance.dao;

import java.io.IOException;
import java.io.Reader;
import java.util.HashMap;
import java.util.*;


import com.ibatis.sqlmap.client.SqlMapClient;
import com.util.db.SqlMapConfig;
import com.performance.vo.PerformanceVO;

public class PerformanceDao {
	public static Reader reader;
	public static SqlMapClient sqlMapper;
	public static PerformanceVO vo;
	
	
	public PerformanceDao() throws IOException{
		
		sqlMapper = SqlMapConfig.getSqlMapClient();
	}
	
	public List getTest()throws Exception{
		return sqlMapper.queryForList("performance.test_list", null);
	}
	
	public int loginCheck(HashMap map)throws Exception{
		return (Integer) sqlMapper.queryForObject("performance.loginCheck", map);
	}
	
	public HashMap infoById(HashMap map)throws Exception{
		return (HashMap)sqlMapper.queryForObject("performance.infoById", map);
	}
	public List infoCourse()throws Exception{
		return sqlMapper.queryForList("performance.infoCourse", null);
	}

}
