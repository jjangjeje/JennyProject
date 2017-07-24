package first.sample.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import first.sample.service.SampleService;
import first.sample.paging.SamplePaging;
import first.sample.controller.SamplePage;
@Controller
public class SampleController {
	Logger log = Logger.getLogger(this.getClass());
	
	@Resource(name="sampleService")
	private SampleService sampleService;
	
	
	
	@RequestMapping(value="/sample/couponList.do")
	public ModelAndView couponList(Map<String,Object> map , HttpServletRequest request,SamplePage page) throws Exception{
		ModelAndView mv = new ModelAndView("/sample/couponList");
		
		String pagecurrent = request.getParameter("currentPage");
		SamplePaging input= null;
		
		int currentPage = 0;
		int blockCount = 10;
		int blockPage = 10;
		int paging = 0;
		int START_PAGE = 0;
		int END_PAGE = 0;
		
		if(pagecurrent != null){
			currentPage = Integer.parseInt(pagecurrent);
		}else{currentPage = 1;}
		
		START_PAGE = (currentPage -1)*blockPage + 1;
		END_PAGE = blockCount * currentPage ;
		
		map.put("START_PAGE", START_PAGE);
		map.put("END_PAGE", END_PAGE);
		
		List<Map<String,Object>> list = sampleService.couponList(map); //10개씩 가져오는 LIST
		List<Map<String,Object>> listALL = sampleService.couponlistALL(map); //전체 LIST
		
		
		int totalCount = listALL.size();
		
		String pagingHtml  = page.getPage(currentPage, totalCount, blockCount, blockPage, input, paging);
		/*List pagelist = page.getList(currentPage, totalCount, blockCount, blockPage, input, list, paging);
		*/
		
		mv.addObject("pagingHtml", pagingHtml);
		/*mv.addObject("pagelist", pagelist);*/
		mv.addObject("list", list);
		mv.addObject("totalCount",totalCount);
		return mv;
		
	}
}
