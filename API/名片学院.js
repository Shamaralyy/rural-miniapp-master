
/*** glowxq glowxq@163.com  2022-08-21 18:25:51  生成模板  */
import { request } from "@/utils/request"



/***  ===========================================================================
 * path: /api/business/ruralCourseStep/page
  * summary: 分页查询课程步骤
 * tags: 名片学院
 */
let apiBusinessRuralCourseStepPage_Param = {
     pageNum: null,   /**     string required:false */
     pageSize: null,   /**     string required:false */
     name: null,   /** 步骤名称    string required:false */
     present: null,   /** 步骤说明    string required:false */
     courseId: null,   /** 课程ID    string required:false */
     status: null,   /** 状态(0:未审核,1:已通过,2:未通过)    string required:false */
     aside: null,   /** 步骤旁白    string required:false */
   }
    
export function apiBusinessRuralCourseStepPage_Post( apiBusinessRuralCourseStepPage_Param    ) {
    return request({
         url:`/api/business/ruralCourseStep/page`,
         method:'post',
                     params:apiBusinessRuralCourseStepPage_Param  
                
    })
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /api/business/course/page
  * summary: 分页查询课程
 * tags: 名片学院
 */
let apiBusinessCoursePage_Param = {
     pageNum: null,   /**     string required:false */
     pageSize: null,   /**     string required:false */
     name: null,   /** 课程标题    string required:false */
     present: null,   /** 课程介绍    string required:false */
     filterTag: null,   /** 筛选标题    string required:false */
     status: null,   /** 状态(0:未审核,1:已通过,2:未通过)    string required:false */
     exhibitTag: null,   /** 展示标题    string required:false */
   }
    
export function apiBusinessCoursePage_Post( apiBusinessCoursePage_Param    ) {
    return request({
         url:`/api/business/course/page`,
         method:'post',
                     params:apiBusinessCoursePage_Param  
                
    })
}
/**  =========================================================================== ***/
