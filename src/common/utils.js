/**
 * 客户端信息判断
 */
export function client() {
  const browser = navigator.userAgent.toLowerCase();
  let EV = ''
  if (browser.match(/Alipay/i) == "alipay") {
    console.log("支付宝app的浏览器");
    EV = 'alipay'

  } else if (browser.match(/MicroMessenger/i) == "micromessenger") {
    console.log("微信app的浏览器");
    EV = 'wechat'
  } else {
    EV = 'other'
    console.log("非支付宝及微信浏览器环境");
  }
  return EV
}

/**
 * showSaveFilePicker API 下载(允许用户选择文件的下载目录、选择文件的保存格式和更改存储的文件名称)
 * @param {*} blob 
 * @param {*} filename 
 */
export async function saveFile(blob, filename) {
  try {
    const handle = await window.showSaveFilePicker({
      multiple: false, // 只选择一个文件
      suggestedName: filename,
      excludeAcceptAllOption: true,
      types: [
        {
          description: "PNG file",
          accept: {
            "image/png": [".png"],
          },
        },
        {
          description: "Jpeg file",
          accept: {
            "image/jpeg": [".jpeg"],
          },
        },
      ],
    });
    // 如果没有选择文件，就不需要继续执行了
    if (!handle) {
      return;
    }

    // 这里的 options 用来声明对文件的权限，能否写入
    const options = {
      writable: true,
      mode: 'readwrite',
    };
    // 然后向用户要求权限
    if ((await handle.queryPermission(options)) !== 'granted'
      && (await handle.requestPermission(options)) !== 'granted') {
      alert('Please grant permissions to read & write this file.');
      return;
    }
    const writable = await handle.createWritable();
    await writable.write(blob);
    await writable.close();
    return handle;
  } catch (err) {
    console.error(err.name, err.message);
  }
}
