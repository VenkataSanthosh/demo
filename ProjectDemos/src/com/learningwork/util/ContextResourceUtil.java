package com.learningwork.util;

import javax.naming.Context;
import javax.naming.InitialContext;
import javax.naming.NamingException;

import com.learning.commonconstants.CommonConstants.ContextConstants;

public class ContextResourceUtil {

	public static Object getResource(ContextConstants resourseObj) {

		Object response = null;
		ContextResourceUtil contextResourceUtilObj = new ContextResourceUtil();

		switch (resourseObj) {
		case TEMPLATE_LOCATION: {
			response = contextResourceUtilObj.getObject(resourseObj);
			break;
		}
		default: {
			break;
		}
		}

		return response;

	}

	private Object getObject(ContextConstants contextResourceObject) {

		Object response = null;
		try {

			Context envContext = null;
			Context initContext = new InitialContext();
			envContext = (Context) initContext.lookup("java:/comp/env");
			response = (Object) envContext.lookup(contextResourceObject
					.getObjName());

		} catch (NamingException e) {
		} catch (Exception e) {
		}
		return response;

	}

}
