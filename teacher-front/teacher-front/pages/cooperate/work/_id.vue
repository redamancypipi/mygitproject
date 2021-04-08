<template>
  <div style="background-color:#eee;width:100%">
    <div style="width:80.5%;margin:0 auto;padding-top:20px">
      <el-container >
        <el-header style="height:350px;text-align: left;padding-left: 25px;">
          {{courseInfo.title}} <router-link to="/cooperate/course">
  
            <el-button type="danger" size="mini" style="margin-left:10%;margin-top:3%" @click="deleteCourse">删除课程</el-button>
          </router-link>
          <br>
          
          <span style="font-size:15px;margin-left:10px">课程简介：</span>
          <p style="font-size:15px;margin-top:1px;margin-left:20px" v-html="courseInfo.desc"></p>
          
          <br>
          <br>
        </el-header>
        <br>
        <br>

        <el-container>
          <el-aside width="200px">
            <el-menu :default-active="$route.path" class="el-menu-vertical-demo" router>
              <el-menu-item @click="clicked1()">
                <span slot="title">作业</span>
              </el-menu-item>
              <el-menu-item  @click="clicked2()">
                <span slot="title"> 学生名单</span>
              </el-menu-item>
              <el-menu-item  @click="clicked3()"> 
                <span slot="title">资源</span>
              </el-menu-item>  
              <el-menu-item @click="clicked4()"> 
                <span slot="title">评论</span>
              </el-menu-item>
              <el-menu-item @click="clicked5()"> 
                <span slot="title">章节管理</span>
              </el-menu-item>        
            </el-menu> 
             
          </el-aside>
          <el-container>
            <el-main>
              <template>
                <!-- 作业开始 -->
                <div style="" v-if="work!=''">
                  <div class="Mdiv3" style="width: 1000px; height: 100px;">
                    <div class="Mdiv4" style="width: 150px; height: 80px; float:left; display:inline">
                      <span id="word2">作业</span> 
                    </div>
                    <div class="Mdiv5" style="width: 150px; height: 80px; float:left; display:inline">
                      <el-button
                          size="small"
                          type="success"
                          @click="dialogFormVisible = true"
                          >+ 布置作业</el-button>
                    </div>

                    <el-dialog title="作业列表 > 布置作业" :visible.sync="dialogFormVisible">
                      <el-form :model="form">
                        <el-form-item label="作业标题:" :label-width="formLabelWidth">
                          <el-input placeholder="如：默写《静夜诗》 或 数学作业第二节" v-model="form.title" autocomplete="off" style="width:300px"></el-input>
                        </el-form-item>
                        <el-form-item label="作业描述:" :label-width="formLabelWidth">
                          <el-input type="textarea"  v-model="form.content" autocomplete="off" style="width:500px"></el-input>
                        </el-form-item>
                        <el-form-item label="提交截至时间:" :label-width="formLabelWidth">
                          <el-date-picker v-model="form.deadline" type="datetime" placeholder="选择日期时间"></el-date-picker>
                        </el-form-item> 
                      </el-form>
                      <div slot="footer" class="dialog-footer" >
                          <el-button @click="dialogFormVisible = false" >取消</el-button>
                          <el-button type="primary" @click="publishWork();dialogFormVisible = false">布置</el-button>
                      </div> 
                    </el-dialog>
                  </div>
                    <article class="work-list">
                      <ul class="of">
                      
                      <section class="i-teach-wrap" v-for="task in taskList" :key="task.id">
                          <div class="word3">
                            <span class="fsize18 c-666" id="word3">{{task.title}}</span>
                            <br>
                            <span  class="word6" id="word6">内容：{{task.content}}</span>
                            <br>
                            <br>
                            <span class="word6" id="word6">截止时间：{{ task.deadline | showTime }}</span>
                          </div>
                      </section>
                    </ul>
                  </article>
                </div>
                <!-- 作业结束 -->
                <!-- 学生名单开始 -->
                <div id="aCoursesList" class="bg-fa of" v-if="Slist!=''">
                  <section class="list">
                      <div class="Llist">
                        <div class="Ldiv1"></div>     
                      </div>
                      <div class="Ldiv4" >
                        
                          <el-table
                            :data="list"
                            style="width: 100%;"
                            header-cell-style="background-color:#EEEEEE;">
                            <el-table-column
                              prop="id"
                              label="学生ID"
                              width="180">
                            </el-table-column>
                            <el-table-column
                              prop="name"
                              label="姓名"
                              width="180">
                            </el-table-column>
                            <el-table-column
                              prop="tel"
                              label="手机号">
                            </el-table-column>
                          </el-table>
                      </div>
                  </section>
                </div>
                <!-- 学生名单结束 -->
                <!-- 资源开始 -->
                <div v-if="ppt!=''">
                  <div class="Mdiv3" style="width: 1000px; height: 100px;">
                    <div class="Mdiv4" style="width: 150px; height: 80px; float:left; display:inline">
                      <span id="word2">资源</span> 
                    </div>
                    <div class="Mdiv5" style="width: 150px; height: 80px; float:left; display:inline">
                      <el-upload
                        :action="uploadurl"
                        class="upload-demo"
                        accept=".docx,.pdf,.txt,.pptx,.xlsx"
                        :on-preview="handlePreview"
                        :on-remove="handleRemove"
                        :before-remove="beforeRemove"
                        multiple
                        :on-exceed="handleExceed"
                        :on-success="handleSuccess"
                       >
                        <el-button size="small" type="success">+ 点击上传</el-button>
                      </el-upload>
                    </div>              
                  </div>
                  <article class="work-list">
                    <ul class="of">
                      <section class="i-teach-wrap" v-for="file in filelist" :key="file.id">
                          <div class="word3">
                           
                            <a :href="file.url"  class="fsize18 c-666" id="word3">{{file.title}}</a>
                            <br>
                            <br>
                            <span class="word6" id="word6">资源id：{{file.id}}</span>
                          </div>
                      </section>
                    </ul>
                  </article>
                </div>
                <!-- 资源结束 -->
                <!-- 评论开始 -->
                <div v-if="comm!=''" style="background-color:white;">
                  
                  <h6 class="c-c-content c-infor-title" id="i-art-comment">
                    <span class="commentTitle">课程评论</span>
                  </h6>
                  <section class="lh-bj-list pr mt20 replyhtml" >
                    <ul>
                      <li class="unBr">
                        <aside class="noter-pic">
                          <img width="50" height="50" class="picImg" :src="teacherInfo.avatar">
                          </aside>
                        <div class="of">
                          <section class="n-reply-wrap">
                            <fieldset>
                              <textarea v-model="Comment.content" name="" placeholder="输入您要评论的文字" id="commentContent"></textarea>
                            </fieldset>
                            <p class="of mt5 tar pl10 pr10">
                              <span class="fl "><tt class="c-red commentContentmeg" style="display: none;"></tt></span>
                              <input @click="publishComment()" type="button" value="发表评论" class="lh-reply-btn" style="width:50px;">
                            </p>
                          </section>
                        </div>
                      </li>
                    </ul>
                  </section>
                  <section>
                    <section class="question-list lh-bj-list pr">
                      <ul class="pr10">
                        <li v-for="(comment,index1) in commList" :key="index1" style="border-bottom:1px solid #e9e9e9;">
                          
                           <!-- 获取父评论开始 -->

                            <div>
                              <aside class="noter-pic">
                                <img
                                  width="50"
                                  height="50"
                                  class="picImg"
                                  :src="comment.avatar"
                                />
                              </aside>
                              <div class="of">
                                <span class="fl">
                                  <font class="fsize12 c-blue">
                                    {{ comment.nickname }}</font
                                  >
                                  <font class="fsize12 c-999 ml5">评论：</font>
                                </span>
                              </div>
                              <div class="noter-txt mt5">
                                <p>{{ comment.content }}</p>
                              </div>

                              <div class="of mt5" v-if="comment.status == '0'">
                                <p class="of mt5 tar pl10 pr10">
                                  <span class="fl"
                                    ><tt
                                      class="c-red commentContentmeg"
                                      style="display: none;"
                                    ></tt
                                  ></span>
                                  <input
                                    type="button"
                                    @click="openBox(index1)"
                                    value="回复"
                                    class="lh-reply-btn"
                                  />
                                </p>
                                <span class="fr">
                                  <font class="fsize12 c-999 ml5">{{comment.gmtCreate | showTime}}</font>
                                </span>
                              </div>
                              <!-- 如果点击回复，则弹出此框 (回复父评论)-->
                              <div class="of" v-if="comment.status == '1'">
                                <section class="n-reply-wrap">
                                  <fieldset>
                                    <textarea
                                      name=""
                                      v-model="CommentChild.content"
                                      placeholder="输入您要评论的文字"
                                      id="commentContent"
                                    ></textarea>
                                  </fieldset>
                                  <p class="of mt5 tar pl10 pr10">
                                    <span class="fl"
                                      ><tt
                                        class="c-red commentContentmeg"
                                        style="display: none;"
                                      ></tt
                                    ></span>
                                    <input
                                      type="button"
                                      @click="
                                        submit(comment.id, comment.nickname)
                                      "
                                      value="发表评论"
                                      class="lh-reply-btn"
                                      style="width:50px;"
                                    />
                                  </p>
                                </section>
                              </div>
                            </div>

                            <!-- 获取父评论结束 -->
                            <!-- 二级评论 -->
                            <ol>
                            
                            <li v-for="(item,index) in comment.children" :key="index"  style="padding-left: 0px;border-top:1px solid #e9e9e9;">
                             
                              <aside class="noter-pic1 fl">
                                  <img
                                    width="25px"
                                    height="25px"
                                    class="picImg"
                                    :src="item.avatar"
                                  />
                                </aside>
                                <div class="of">
                                  <span class="fl">
                                    <font class="fsize12 c-blue">
                                      {{ item.nickname }}</font
                                    >
                                    <font class="fsize12 c-999 ml5"
                                      >回复：
                                      <font class="fsize12 c-blue">
                                        {{ item.realName }}</font
                                      >
                                    </font>
                                  </span>
                                </div>
                                <div class="noter-txt mt5">
                                  <p>{{ item.content }}</p>
                                </div>
                                <!-- 子评论显示 -->
                                <div class="of mt5" v-if="item.status == '0'">
                                  <p class="of mt5 tar pl10 pr10">
                                    <span class="fl"
                                      ><tt
                                        class="c-red commentContentmeg"
                                        style="display: none;"
                                      ></tt
                                    ></span>
                                    <input
                                      type="button"
                                      @click="openBox1(index1, index)"
                                      value="回复"
                                      class="lh-reply-btn"
                                    />
                                  </p>
                                  <span class="fr">
                                    <font class="fsize12 c-999 ml5">{{item.gmtCreate | showTime}}</font>
                                  </span>
                                </div>
                                <!-- 子评论下再评论 -->
                                <div class="of" v-if="item.status == '1'">
                                  <section class="n-reply-wrap">
                                    <fieldset>
                                      <textarea
                                        name=""
                                        v-model="CommentChild.content"
                                        placeholder="输入您要评论的文字"
                                        id="commentContent"
                                      ></textarea>
                                    </fieldset>
                                    <p class="of mt5 tar pl10 pr10">
                                      <span class="fl"
                                        ><tt
                                          class="c-red commentContentmeg"
                                          style="display: none;"
                                        ></tt
                                      ></span>
                                      <input
                                        type="button"
                                        @click="
                                          submit(comment.id, item.nickname)
                                        "
                                        value="发表评论"
                                        class="lh-reply-btn"
                                        style="width:50px;"
                                      />
                                    </p>
                                  </section>
                                </div>
                              
                            </li>
                          </ol>
                        </li>
                      </ul>
                    </section>
                  </section>
                </div>
                <!-- 评论结束 -->
                <!-- 章节管理开始 -->
                <div v-if="chapter!=''">
                  <div class="Mdiv3" style="width: 1000px; height: 100px;">
                    <div class="Mdiv4" style="width: 150px; height: 80px; float:left; display:inline">
                      <span id="word2">章节列表</span> 
                    </div>
                    <div class="Mdiv5" style="width: 150px; height: 80px; float:left; display:inline">
                      <el-button type="success" size="small" @click="dialogVisible = true">添加章节</el-button>
                      <el-dialog
                        title="提示"
                        :visible.sync="dialogVisible"
                        width="30%"
                        :before-close="handleClose">
                        <el-form :model="chapterInfo" label-width="120px">
                          <el-form-item label="章节标题">
                              <el-input v-model="chapterInfo.title"/>
                          </el-form-item>
                          <el-form-item label="章节排序">
                              <el-input-number v-model="chapterInfo.sort" :min="0" controls-position="right"/>
                          </el-form-item>
                      </el-form>
                      <span slot="footer" class="dialog-footer">
                        <el-button @click="dialogVisible = false">取 消</el-button>
                        <el-button type="primary" @click="addChapter">确 定</el-button>
                      </span>
                      </el-dialog>
                      
                    </div>              
                  </div>
                  <!-- 列表 -->
                  <article class="work-list">
                    <ul class="of">
                      <li v-for="(chapter,index) in chapterList" :key="index" style="border-bottom:1px solid #e9e9e9;padding:20px;">
                       <div style="height:20px;"></div> 
                        <span class="course-title fsize18 c-333">&nbsp;&nbsp;第{{index+1}}章&nbsp;{{chapter.title}}</span>
                        <div style="float:right;">
                          <el-button type="danger" size="mini" @click="deletechapter(chapter.id)">删除章节<i class="el-icon-delete"></i></el-button>
                          <el-button type="success" size="mini" @click="dialogvedioVisible = true">添加小节<i class="el-icon-upload el-icon--right"></i></el-button>
                     <el-dialog
                          title="提示"
                          :visible.sync="dialogvedioVisible"
                          width="30%"
                          :before-close="handleClose">
                          <el-form ref="form" :model="video" label-width="100px">
                            <el-form-item label="小节名称">
                              <el-input v-model="video.title"></el-input>
                            </el-form-item>
                            <el-form-item label="排序">
                              <el-input-number v-model="video.sort" :min="0" controls-position="right"/>
                            </el-form-item>
                            <el-form-item label="视频费用">
                              <el-input v-model="video.free"></el-input>
                            </el-form-item>
                            <el-upload
                                    :on-success="handleVodUploadSuccess"
                                    :on-remove="handleVodRemove"
                                    :before-remove="beforeVodRemove"
                                    :on-exceed="handleUploadExceed"
                                    :file-list="fileList"
                                    action="http://dmbw68.natappfree.cc/api/video/uploadAlyiVideo"
                                    
                                    :limit="1"
                                    class="upload-demo">
                                <el-button size="small" type="primary">上传视频</el-button>
                                <el-tooltip placement="right-end">
                                    <div slot="content">最大支持1G，<br>
                                        支持3GP、ASF、AVI、DAT、DV、FLV、F4V、<br>
                                        GIF、M2T、M4V、MJ2、MJPEG、MKV、MOV、MP4、<br>
                                        MPE、MPG、MPEG、MTS、OGG、QT、RM、RMVB、<br>
                                        SWF、TS、VOB、WMV、WEBM 等视频格式上传</div>
                                    <i class="el-icon-question"/>
                                </el-tooltip>
                                </el-upload>
                            <!-- <el-form-item label="视频地址">
                              <el-input v-model="video.videoSourceId"></el-input>
                            </el-form-item> -->
                            <el-form-item label="视频名称">
                              <el-input v-model="video.videoOriginalName"></el-input>
                            </el-form-item>
                          </el-form>
                          <span slot="footer" class="dialog-footer">
                            <el-button @click="dialogvedioVisible = false">取 消</el-button>
                            <el-button type="primary" @click="addVideo(chapter.id);dialogvedioVisible = false">提交</el-button>
                          </span>
                        </el-dialog>        
                        </div> 
                        
                                         
                        <div style="height:20px;"></div>  
                        <ol>
                          <!-- 子章节 -->
                          <li v-for="(video,index) in chapter.children" :key="index"  style="padding-left: 0px;border-top:1px solid #e9e9e9;">
                            <div style="height:20px;"></div>   
                            <span  style="font-color:grey;font-size:15px;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{video.title}}</span>
                            <div style="float:right;">
                              <el-button type="danger" size="mini" @click="removeVideo(video.id)">删除小节<i class="el-icon-delete"></i></el-button>      
                            </div>
                            <div style="height:20px;"></div>
                          </li>
                        </ol>
                        <div style="height:20px;"></div>
                      </li>
                    </ul>
                  </article>
                </div>
                <!-- 章节管理结束 -->
              </template>
            </el-main>
          </el-container>
        </el-container>
        <div style="margin-top:200px"></div>
        <br>
        <br>
      </el-container>
    </div>
  </div>
</template>

<script>

import cookie from 'js-cookie'
import course from '@/api/course'
import video from '@/api/edu/video'
import { myformatDate } from '@/utils/index'
export default {
  asyncData({params,error}){
    // console.log(params.id)
    return {
      courseId:params.id
    };   
  },
  data() {
    return {
     
      uploadurl:'',  //上传资源url
      dialogFormVisible: false,
      dialogVisible: false,
      dialogvedioVisible: false,
      dialogChapterFormVisible:false,//章节弹框
      teacherInfo:null,
      form: {
        title: '',
        deadline:'',
        course_id:'',  
        content:'',
        status:''
      },  //作业内容
      formLabelWidth: "120px",
      taskList:null,  //作业列表
      list: null,  //学生名单
      filelist:null,  //资源列表
      commList:{},  //评论列表
      chapterList:null,//章节列表
      Comment:{
        content:'',
        courseId:'',
        nickname:'',
        id:'',
        pid:'',
        avatar:'',
       
        memberId:''
      },//评论内容
      CommentChild: {
        content: "",
        courseId: "",
        pid: "",
        avatar: "",
        nickname: "",
        memberId: "",
        realName: ""
      },
      chapterInfo:{
        courseId:'',
        sort:'',
        title:''
      },
      chapterId:'',
      work:'',
      Slist:'',
      ppt:'',  
      comm:'',
      chapter:'',    
      courseInfo:{
        title:'',
        desc:''
      },  //课程详细信息
      video: {
        chapterId:'',
        title: '',
        sort: 0,
        free: 0,
        videoSourceId: '',
        videoOriginalName:''//视频名称
      },//小节信息
      fileList:[]//文件列表
    }
  },
  filters: {
    showTime(value) {
        const date = new Date(value)
        return myformatDate(date,'yyyy-MM-dd hh:mm:ss');
      }
  },
  created() {
    this.getcourse()
    this.courseWork()
    this.studentList()
    this.courseFile()
    this.getCommList()
    this.getChapterList()
  },
  methods: {
    //点击确定调用的方法
        handleVodRemove() {
            //调用接口的删除视频的方法
            video.deleteAliyunvod(this.video.videoSourceId)
                .then(response => {
                    //提示信息
                    this.$message({
                        type: 'success',
                        message: '删除视频成功!'
                    });
                    //把文件列表清空
                    this.fileList = []
                    //把video视频id和视频名称值清空
                    //上传视频id赋值
                    this.video.videoSourceId = ''
                    //上传视频名称赋值
                    this.video.videoOriginalName = ''
                })
        },
        //点击×调用这个方法
        beforeVodRemove(file,fileList) {
            return this.$confirm(`确定移除 ${ file.name }？`);
        },
        //上传视频成功调用的方法
        handleVodUploadSuccess(response, file, fileList) {
            //上传视频id赋值
            console.log(response)
            this.video.videoSourceId = response.data.videoId
            //上传视频名称赋值
            this.video.videoOriginalName = file.name
        },
        handleUploadExceed() {
            this.$message.warning('想要重新上传视频，请先删除已上传的视频')
        },
    //点击函数，点击以后显示相应页面
    clicked1(){
      this.work='1'
      this.Slist=''
      this.ppt=''
      this.comm=''
      this.chapter=''
    },
    clicked2(){
      this.work=''
      this.Slist='1'
      this.ppt=''
      this.comm=''
      this.chapter=''
    },
    clicked3(){
      this.work=''
      this.Slist=''
      this.ppt='1'
      this.comm=''
      this.chapter=''
    },
    clicked4(){
      this.work=''
      this.Slist=''
      this.ppt=''
      this.comm='1'
      this.chapter=''
    },
    clicked5(){
      this.work=''
      this.Slist=''
      this.ppt=''
      this.comm=''
      this.chapter='1'
    },
    
    //获取课程详细信息
    getcourse() {
      this.work='1'
      course.getCourseInfo(this.courseId)
        .then(response => {
          // console.log(response.data.data.teacherId);
          this.courseInfo.title = response.data.data.title
          this.courseInfo.desc = response.data.data.description
          this.form.course_id = response.data.data.id
          //console.log(this.response.data.data.id)
          this.Comment.courseId = response.data.data.id
          this.CommentChild.courseId = response.data.data.id
          //获取老师详细信息
          course.getTeacherInfo(response.data.data.teacherId)
          .then(response =>{
            this.teacherInfo=response.data.data
            console.log(response.data.data.avatar)
            this.Comment.avatar = response.data.data.avatar
            this.Comment.nickname = response.data.data.name
            this.Comment.memberId = response.data.data.id
            this.CommentChild.avatar = response.data.data.avatar;
            this.CommentChild.nickname = response.data.data.name;
            this.CommentChild.memberId = response.data.data.id;
          })
        });
    },
    //发布作业
    publishWork() {
      this.$alert("布置成功", "提示", {
        confirmButtonText: "确定",
        callback: action => {
          this.$message({
            type: "info",
            message: '已发布'
          });
        }
      });
      course.publishWork(this.courseId,this.form)
        .then(() => {
          this.courseWork()
        })
    },
    //获取已发布作业列表
    courseWork(){
      course.getTaskList(this.courseId)
        .then(response =>{
          this.taskList=response.data.data
        })
    },
    //获取学生名单
    studentList(){
      course.getStudentList(this.courseId)
        .then(response => {
          this.list = response.data.data
        })
      
    },
    //查询资源列表
    courseFile(){
      course.getfileList(this.courseId)
        .then(response =>{
          this.filelist = response.data.data
          // console.log(response)
        }),
      this.uploadurl='http://dmbw68.natappfree.cc/api/teacher/uploadFile/'+this.courseId  //上传资源的url
    },
    //获取评论
    getCommList(){
      course.getCommentList(this.courseId)
        .then(response =>{
          console.log(response)
          this.commList = response.data.data
        })
    },

    //添加评论
    publishComment(){
      this.Comment.pid = '0'
     this.Comment.courseId = this.courseId
      course.publishComment(this.Comment)
        .then(response =>{
          console.log(response)
          // console.log(this.Comment)
          this.getCommList();
        })
    },
    //删除课程
    deleteCourse(){
      course.deleteCourse(this.courseId)
        .then(response =>{
          <router-link to="/cooperate/course" />
        })
    },
    //获取章节列表
    getChapterList(){
      course.getChapterList(this.courseId)
        .then(response =>{
          // console.log(response)
          this.chapterList = response.data.data.allVideos
          // console.log(this.chapterList)
        })
    },
    //添加章节
    addChapter(){
      this.dialogVisible = false
      this.chapterInfo.courseId = this.courseId
      course.addchapterInfo(this.chapterInfo)
        .then(response =>{
          // console.log(response)
          // console.log(this.chapterInfo)
        })
    },
    //删除章节
    deletechapter(id){
      this.$confirm('此操作将删除章节, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {  //点击确定，执行then方法
                //调用删除的方法
                course.deleteChapter(id)
                    .then(response =>{//删除成功
                    //提示信息
                    this.$message({
                        type: 'success',
                        message: '删除章节成功!'
                    });
                    //刷新页面
                    console.log(response)
                    this.getChapterList()
                })
            }) //点击取消，执行catch方法
    },
    //删除小节
    removeVideo(id) {
            this.$confirm('此操作将删除小节, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {  //点击确定，执行then方法
                //调用删除的方法
                video.deleteVideo(id)
                    .then(response =>{//删除成功
                    //提示信息
                    this.$message({
                        type: 'success',
                        message: '删除小节成功!'
                    });
                    //刷新页面
                    this.getChapterList()
                })
            }) //点击取消，执行catch方法
        },
    //添加小节
    addVideo(chapter_id) {
            //设置课程id
            this.video.chapterId = chapter_id
            this.video.courseId = this.courseId
            video.addVideo(this.video)
                .then(response => {
                    //关闭弹框
                    console.log(this.video.videoSourceId)
                    //提示

                    this.$message({
                        type: 'success',
                        message: '添加小节成功!'
                    });
                    //刷新页面
                    this.getChapterList()
                })
        },
    handleChange(file, fileList) {
      this.fileList = fileList;
    },
    
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    //上传成功
    handleSuccess() {
      this.courseFile();
    },
    

    //弹出父评论的回复框
    openBox(index) {
      //console.log(this.comments[index])
      //console.log(index)
     
        this.commList[index].status = "1";
      

      // console.log(this.comments[index])
    },
    //提交父评论的回复
    submit(id, name) {
      this.CommentChild.pid = id;
      this.CommentChild.realName = name;
      console.log(this.CommentChild.realName);
      course.publishComment(this.CommentChild).then(response => {
        console.log(response);
        this.getCommList();
        this.CommentChild.content = "";
      });
    },

    //弹出子评论的回复框
    openBox1(index1, index2) {
      //console.log(index1)
      //console.log(index2)

        this.CommentChild.content = "";
        this.commList[index1].children[index2].status = "1";
    },
  }
}
</script>

<style scope>
*{
  margin: 0;padding: 0;
}
  
   .el-header{
    background-color: #9088d4;
    color: #fff;
    width: 100%;
    font-size: 20px;
  }
  
  .el-aside {
    background-color: #eee;
    color: #333;
    text-align: center;
    line-height: 200px;
    margin-top: 20px;
  }
  
  .el-main {
    background-color: #eee;
    color: #333;
  }
  
  body > .el-container {
    margin-bottom: 40px;
  }
  
  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }
  
  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
  /* #word4 {
    margin-left: 70%;
  } */
  .i-teach-wrap{
	/* //加了这个i大小 */
	width:900px;
  height: 100px;
  margin-top: 20px;
}
.word6{
	position: absolute;
}
#word6{
	/* //作业内容 */
	margin-left:-505px;
	margin-top:25px;
	
}
.word5{
	/* //改变了位置 */
	/* margin-left:10%; */
	/* margin-top:40px; */
	position: absolute;
}
#word4{
	/* width: 100px; */
	/* //改变了位置 */
	/* margin-left:-100px; */
	margin-top:60px;
	color: #a8a4a4;
	font-size: 15px;

	/* position: absolute; */
}
#word3{
	/* //加了字体大小 */
	text-decoration: none;
	font-weight:bolder;
	margin-left:-950px;
	font-size:22px;
}
</style>
