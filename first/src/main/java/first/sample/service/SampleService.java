package first.sample.service;

import java.util.List;
import java.util.Map;

public interface SampleService {

	List<Map<String, Object>> couponList(Map<String, Object> map) throws Exception;

	List<Map<String, Object>> couponlistALL(Map<String, Object> map) throws Exception;

}
