<template>
  <div class="wrapper">
    <div class="info-item">
      <div>
        <img :src="headImg" alt="头像" />
      </div>
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
    </div>
  </div>
</template>

<script>
import { VueCropper } from "vue-cropper";

export default {
  name: "CropperPicture",
  components: {
    VueCropper,
  },
  data() {
    return {
      headImg: require("../assets/images/logo.png"),
      //剪切图片上传
      crap: false,
      previews: {},
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
        let data;
        if (typeof e.target.result === "object") {
          // 把Array Buffer转化为blob 如果是base64不需要
          data = window.URL.createObjectURL(new Blob([e.target.result]));
        } else {
          data = e.target.result;
        }
        if (num === 1) {
          _this.option.img = data;
        } else if (num === 2) {
          _this.example2.img = data;
        }
      };
      // 转化为base64
      // reader.readAsDataURL(file)
      // 转化为blob
      reader.readAsArrayBuffer(file);
    },
    imgLoad(msg) {
      console.log("imgLoad");
      console.log(msg);
    },
  },
};
</script>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  flex-direction: column;
}
.info-item {
  margin-top: 15px;
  font-size: 30px;
  color: #fff;
  .btn-group {
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 10px 30px;
    box-sizing: border-box;
    #selectInput {
      width: 200px;
      flex: 0 0 100px;
      border: none;
      outline: none;
      padding: 12px 20px;
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
    .preview {
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
