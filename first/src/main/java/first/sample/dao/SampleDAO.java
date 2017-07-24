package first.sample.dao;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import first.common.dao.AbstractDAO;

@Repository("sampleDAO")
public class SampleDAO extends AbstractDAO{

	@SuppressWarnings("unchecked")
	public List<Map<String, Object>> couponList(Map<String, Object> map) throws Exception {
		
		return (List<Map<String,Object>>)selectList("couponList",map);
	}
	@SuppressWarnings("unchecked")
	public List<Map<String, Object>> couponListALL(Map<String, Object> map) throws Exception {
			
		return (List<Map<String,Object>>)selectList("couponlistALL",map);
	}

}
