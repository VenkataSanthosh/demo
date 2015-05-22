package com.learning.commonconstants;

public class CommonConstants {

	
	public enum ContextConstants{
		TEMPLATE_LOCATION("TemplateLocation");
		private String objName;
		ContextConstants(String objName){
			this.objName = objName;
		}
		public String getObjName() {
			return objName;
		}
		public void setObjName(String objName) {
			this.objName = objName;
		}
		
	}
}
