package com.performance.manager;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.performance.dao.PerformanceDao;

public class PerformanceManager {
	private static PerformanceManager instance = new PerformanceManager();
	public static PerformanceManager getInstance(){
		return instance;
	}
	
	public List getTest()throws Exception{
		PerformanceDao dao = new PerformanceDao();
		return dao.getTest();
	}
	
	public int loginCheck(HashMap map)throws Exception{
		PerformanceDao dao = new PerformanceDao();
		return dao.loginCheck(map);
		
	}
	
	public HashMap infoById(HashMap map)throws Exception{
		PerformanceDao dao = new PerformanceDao();
		return dao.infoById(map);
	}
	public List infoCourse()throws Exception{
		PerformanceDao dao = new PerformanceDao();
		return dao.infoCourse();
	}
}
