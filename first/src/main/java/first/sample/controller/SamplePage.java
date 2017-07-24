package first.sample.controller;

import java.util.List;

import org.springframework.stereotype.Controller;

import first.sample.paging.SamplePaging;

@Controller
public class SamplePage {

	public String getPage(int currentPage,int totalCount,int blockCount,
			int blockPage,SamplePaging input,int paging){
		
		String pagingHtml = null;
			
		input = new SamplePaging(currentPage, totalCount, blockCount, blockPage,paging);
		
		pagingHtml = input.getPagingHtml().toString();
	
		return pagingHtml;
	}
	
	public List getList(int currentPage,int totalCount,int blockCount,
			int blockPage,SamplePaging input,List list, int paging){
		
		input = new SamplePaging(currentPage, totalCount, blockCount, blockPage, paging);
		
		int lastCount = totalCount;
		
		if (input.getEndCount() < totalCount)
			lastCount = input.getEndCount() + 1;
		
		 list = list.subList(input.getStartCount(), lastCount);
		
		return list;
	}
	
}
