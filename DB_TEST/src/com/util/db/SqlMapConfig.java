package com.util.db;

import java.io.IOException;
import java.io.Reader;
import java.nio.charset.Charset;

import com.ibatis.common.resources.Resources;
import com.ibatis.sqlmap.client.SqlMapClient;
import com.ibatis.sqlmap.client.SqlMapClientBuilder;


public class SqlMapConfig {
public static SqlMapClient sqlMapper;

	static{
		String resource ="com/util/db/SqlMapConfig.xml";
		try{
			Charset charset = Charset.forName("UTF-8");
			Resources.setCharset(charset);
			Reader reader = Resources.getResourceAsReader(resource);
			sqlMapper = SqlMapClientBuilder.buildSqlMapClient(reader);
		}catch(IOException e){
			e.printStackTrace();
		}
	}
	public static SqlMapClient getSqlMapClient(){
		return sqlMapper;
	}
	
}
