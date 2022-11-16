<template>
  <div class="wrapper">
    <div class="bg">
      <h2>图片选择，压缩，上传</h2>
      <h6>
        File 对象 / base64 / Array Buffer / Blob / BinaryString 间相互转化
      </h6>
    </div>
    <div class="info-item">
      <div class="btn-group">
        <input
          id="selectInput"
          type="file"
          :value="imgFile"
          accept="image/png, image/jpeg, image/gif, image/jpg"
          @change="uploadImg($event, 1)"
        />
        <input
          type="button"
          id="uploadInput"
          value="上传头像"
          @click="finish('blob')"
        />
        <input
          type="button"
          id="uploadInput"
          value="fileSaver.js下载"
          @click="downLocal('blob')"
        /><input
          type="button"
          id="uploadInput"
          value="picker 下载"
          @click="pickerDown('blob')"
        />
      </div>
      <div class="cropper-content">
        <div class="cropper">
          <VueCropper
            ref="cropper"
            :img="option.img"
            :outputSize="option.size"
            :outputType="option.outputType"
            :info="true"
            :full="option.full"
            :canMove="option.canMove"
            :canMoveBox="option.canMoveBox"
            :original="option.original"
            :autoCrop="option.autoCrop"
            :autoCropWidth="option.autoCropWidth"
            :autoCropHeight="option.autoCropHeight"
            :fixedBox="option.fixedBox"
            @realTime="realTime"
            @imgLoad="imgLoad"
          ></VueCropper>
        </div>
        <div class="right-btn">
          <input
            type="button"
            class="oper"
            value="+"
            title="放大"
            @click="changeScale(1)"
          />
          <input
            type="button"
            class="oper"
            value="-"
            title="缩小"
            @click="changeScale(-1)"
          />
          <input
            type="button"
            class="oper"
            value="↺"
            title="左旋转"
            @click="rotateLeft"
          />
          <input
            type="button"
            class="oper"
            value="↻"
            title="右旋转"
            @click="rotateRight"
          />
          <input
            type="button"
            class="oper"
            value="↓"
            title="下载"
            @click="down('blob')"
          />
        </div>
        <div>
          <div class="show-preview">
            <div :style="previews.div" class="preview">
              <img :src="previews.url" :style="previews.img" />
            </div>
          </div>
        </div>
      </div>
      <!-- 图片其他相互转化的演示 -->
      <div class="bg"><h2>图片其他相互转化的演示</h2></div>
      <input type="button" class="btn" value="url2Image" @click="toClick(1)" />
      <input
        type="button"
        class="btn"
        value="image2Canvas"
        @click="toClick(2)"
      />
    </div>
  </div>
</template>

<script>
import { VueCropper } from "vue-cropper"; // 图片裁切插件
import { saveAs } from "file-saver"; // 常用的下载插件
import { fileSave } from "browser-fs-access"; // 另一个下载插件
// import { saveFile } from "../common/utils"; // 自定义 picker 下载
import localforage from "localforage";

export default {
  name: "CropperPicture",
  components: {
    VueCropper,
  },
  data() {
    return {
      headImg: require("../assets/images/logo.png"),
      canvasImg: "",
      //剪切图片上传
      crap: false,
      previews: {},
      modelSrc: "",
      option: {
        img: "",
        outputSize: 1, //剪切后的图片质量（0.1-1）
        full: false, //输出原图比例截图 props名full
        outputType: "png",
        canMove: true,
        original: false,
        canMoveBox: true,
        autoCrop: true,
        autoCropWidth: 150,
        autoCropHeight: 150,
        fixedBox: true,
      },
      fileName: "", //本机文件地址
      downImg: "#",
      imgFile: "",
      uploadImgRelaPath: "", //上传后的图片的地址（不带服务器域名）
    };
  },
  methods: {
    // localforage 存储/获取复杂数据、二进制流
    localforageSet() {
      localforage.setItem("globalData", [this.option, this.option]);
      localforage.setItem("pic", require("../assets/images/qrCode.png"));
    },
    //放大/缩小
    changeScale(num) {
      console.log("changeScale");
      num = num || 1;
      this.$refs.cropper.changeScale(num);
    },
    //坐旋转
    rotateLeft() {
      console.log("rotateLeft");
      this.$refs.cropper.rotateLeft();
    },
    //右旋转
    rotateRight() {
      console.log("rotateRight");
      this.$refs.cropper.rotateRight();
    },
    //上传图片（点击上传按钮）
    finish(type) {
      let formData = new FormData();
      // 输出
      if (type === "blob") {
        this.$refs.cropper.getCropBlob((data) => {
          let img = window.URL.createObjectURL(data);
          this.model = true;
          this.modelSrc = img;
          formData.append("file", data, this.fileName);
          console.log("formData 请求上传图片 Blob----", formData);
          // this.$http 请求
        });
      } else {
        this.$refs.cropper.getCropData((data) => {
          this.model = true;
          this.modelSrc = data;
        });
      }
    },
    // 实时预览函数
    realTime(data) {
      console.log("realTime");
      this.previews = data;
    },
    // showSaveFilePicker API 下载(允许用户选择文件的下载目录、选择文件的保存格式和更改存储的文件名称)
    pickerDown() {
      // 配置
      const options = {
        fileName: "picker.png",
        extensions: "",
        // 默认目录
        startIn: "",
        // 通过指定ID，用户代理可以记住不同ID的不同目录。
        id: "projects",
        // 在文件选择器中包含不应用任何过滤器的选项，默认为“假”。
        excludeAcceptAllOption: false,
      };
      this.$refs.cropper.getCropBlob(async (blob) => {
        // await saveFile(blob, "selfPicker.png");
        await fileSave(blob, options);
      });
    },
    // FileSaver.js 实现文件下载
    downLocal() {
      this.$refs.cropper.getCropBlob((data) => {
        saveAs(data, "save.png");
      });
    },
    //下载图片
    down(type) {
      console.log("down");
      var aLink = document.createElement("a");
      aLink.download = "author-img";
      if (type === "blob") {
        this.$refs.cropper.getCropBlob((data) => {
          this.downImg = window.URL.createObjectURL(data);
          aLink.href = window.URL.createObjectURL(data);
          aLink.click();
        });
      } else {
        this.$refs.cropper.getCropData((data) => {
          this.downImg = data;
          aLink.href = data;
          aLink.click();
        });
      }
    },

    //选择本地图片
    uploadImg(e, num) {
      console.log("uploadImg");
      var _this = this;
      //上传图片
      var file = e.target.files[0];
      _this.fileName = file.name;
      if (!/\.(gif|jpg|jpeg|png|bmp|GIF|JPG|PNG)$/.test(e.target.value)) {
        alert("图片类型必须是.gif,jpeg,jpg,png,bmp中的一种");
        return false;
      }
      var reader = new FileReader();
      reader.onload = (e) => {
        // 实例属性  reader.result  即为文件内容
        let data;
        // 本地直接展示的转化
        if (typeof reader.result === "object") {
          console.log("reader result----1111", reader.result);
          // 把 Array Buffer 转化为 blob 如果是 base64 不需要
          data = window.URL.createObjectURL(new Blob([reader.result]));
        } else {
          console.log("222222");
          console.log("reader result----2222", reader.result);
          data = reader.result;
        }
        console.log("data----", data);
        this.option.img = data;
      };
      // 1.0 转化为 base64  data:image/jpeg;base64,
      // reader.readAsDataURL(file);
      // 2.0 转化为 blob   blob:http://172.16.124.70:8080/aba3035c-c090-48ce-9ed7-028e57c5e8cf
      reader.readAsArrayBuffer(file);
      // 3.0 转化成二进制   看上去像乱码字符串(生产中不推荐使用，该方法已从 FileAPI 标准移除)
      // reader.readAsBinaryString(file);
    },
    // 服务器图片URL 转成 image 标签
    url2Image(url, callback) {
      var image = new Image();
      image.src = url;
      image.onload = function () {
        callback(image);
      };
    },
    toClick(id) {
      this.url2Image(
        "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=4188280155,548323661&fm=26&gp=0.jpg",
        (img) => {
          console.log("img---", img);
          if (id == 2) {
            let canvasImg = this.image2Canvas(img); // 生成canvas
            console.log("canvasImg---", canvasImg);
            this.canvasImg = `${canvasImg}`;
          }
        }
      );
    },
    // 图片转Canvas(这是图片压缩的第一步)
    image2Canvas(image) {
      var canvas = document.createElement("canvas");
      var ctx = canvas.getContext("2d");
      canvas.width = image.naturalWidth;
      canvas.height = image.naturalHeight;
      ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
      return canvas;
    },
    imgLoad(msg) {
      console.log("imgLoad");
      console.log(msg);
    },
  },
  activated() {
    this.localforageSet();
  },
};
</script>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  padding: 40px 0;
  .btn {
    border: none;
    outline: none;
    padding: 12px 20px;
    background-color: #0f9960;
    margin: 0 10px 0;
  }
}
.bg {
  background: #ffe;
  padding: 30px 0px;
  h2 {
    margin: 0;
    padding: 0 0.9375rem;
    font-size: 30px;
    color: indianred;
  }
  h6 {
    margin: 0;
    padding: 10px 0.9375rem;
    font-size: 28px;
    color: indigo;
  }
}
.info-item {
  margin-top: 15px;
  font-size: 30px;
  color: #fff;

  .btn-group {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 30px;
    box-sizing: border-box;
    flex-wrap: wrap;
    #selectInput {
      min-width: 200px;
      flex: 0 0 100px;
      border: none;
      outline: none;
      padding: 15px 20px;
      color: #fff;
    }
    #uploadInput {
      flex: 0 0 1;
      border: none;
      outline: none;
      padding: 12px 20px;
      background-color: #0f9960;
    }
  }
}

.cropper-content {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  .cropper {
    width: 260px;
    height: 260px;
  }
  .right-btn {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 0 20px;
    input {
      font-size: 28px;
      border: none;
      margin: 8px 0;
      box-sizing: border-box;
      color: orangered;
      font-weight: bolder;
      padding: 4px 8px;
      box-shadow: 2px 1px 1px rgba(0, 0, 0, 0.3);
      border-radius: 5px;
    }
  }
  .show-preview {
    flex: 1;
    -webkit-flex: 1;
    display: flex;
    display: -webkit-flex;
    justify-content: center;
    -webkit-justify-content: center;
    ::v-deep .preview {
      overflow: hidden;
      border-radius: 50%;
      border: 1px solid #cccccc;
      background: #cccccc;
      margin-left: 40px;
    }
  }
}
.cropper-content .show-preview .preview {
  margin-left: 0;
}
</style>
