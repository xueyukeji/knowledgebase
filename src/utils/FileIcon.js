/**
 * Created by jiuyuehe on 2017/9/15.
 */

import React, {Component} from 'react';


const pdf = require('../assets/images/file/icon_list_pdf.png');
const apk = require('../assets/images/file/icon_list_apk.png');
const folder = require('../assets/images/file/icon_list_folder.png');
const excel = require('../assets/images/file/icon_list_excel.png');
const img = require('../assets/images/file/icon_list_img.png');
const music = require('../assets/images/file/icon_list_music.png');
const ppt = require('../assets/images/file/icon_list_ppt.png');
const doc = require('../assets/images/file/icon_list_doc.png');
const text = require('../assets/images/file/icon_list_txtfile.png');
const video = require('../assets/images/file/icon_list_videofile.png');
const visio = require('../assets/images/file/icon_list_visio.png');
const zip = require('../assets/images/file/icon_list_compressfile.png');
const unknow = require('../assets/images/file/icon_list_unknown.png');
const html = require('../assets/images/file/icon_list_html.png');



export default class FileIcon extends Component {


    getFileExtenName = (srcName) => {

        if (!srcName)
            return;
        if (srcName.indexOf('?')) {
            var name = srcName.split('?')[0];
            return name.substring(name.lastIndexOf('.') + 1).toLowerCase();
        }

        return srcName.substring(srcName.lastIndexOf('.') + 1).toLowerCase();
    }


    render() {

        let {file, icon} = this.props;

        if (icon) {
            return
        }

        if (file.folder) {
            return <img className="icon-img" src={folder}/>
        }

        let fileExt = this.getFileExtenName(file.fileName);

        switch (fileExt) {

            case 'pdf' :
                return <img className="icon-img" src={pdf}/>;

            case 'txt' :
                return <img className="icon-img" src={text}/>;

            case 'doc' :
            case 'docx':
                return <img className="icon-img" src={doc}/>;
            case 'vsd':
            case 'vsdx':
                return <img className="icon-img" src={visio}/>;

            case 'pptm':
            case 'pps':
            case 'pptx' :
            case 'ppt' :
                return <img className="icon-img" src={ppt}/>;

            case 'xlsx':
            case 'xlt' :
            case 'xltm':
            case 'xlsm':
            case 'xlts':
            case 'xlw' :
            case 'xls' :
                return <img className="icon-img" src={excel}/>;

            case 'dwg' :
                return <img className="icon-img" src={unknow}/>;
            case 'dxf' :
                return <img className="icon-img" src={unknow}/>;
            case 'ai' :
            case 'cdr':
            case 'wmf':
                return <img className="icon-img" src={unknow}/>;
            case 'psd' :
                return <img className="icon-img" src={unknow}/>;
            case 'eps' :
                return <img className="icon-img" src={unknow}/>;

            case 'png':
                return <img className="icon-img" src={img}/>;

            case 'jpg':
                return <img className="icon-img" src={img}/>;


            case 'exe':
                return <img className="icon-img" src={zip}/>;

            case 'apk':
                return <img className="icon-img" src={apk}/>;

            case 'htm':
            case 'html':
            case 'css':
                return <img className="icon-img" src={html}/>;
            case 'js':
                return <img className="icon-img" src={html}/>;
            case 'json':
                return <img className="icon-img" src={html}/>;

            case 'rar':
            case 'zip':
            case 'iso':
                return <img className="icon-img" src={zip}/>;
            case 'avi':
            case 'mp4':
                return <img className="icon-img" src={video}/>;

            case 'csv':
                return <img className="icon-img" src={unknow}/>;

            case 'dbf':
                return <img className="icon-img" src={unknow}/>;

            case 'fla':
                return <img className="icon-img" src={unknow}/>;

            case 'mp3':
                return <img className="icon-img" src={music}/>;

            case 'rtf':
                return <img className="icon-img" src={pdf}/>;

            case 'svg':
                return <img className="icon-img" src={img}/>;

            case 'xml':
                return <img className="icon-img" src={unknow}/>;


            default :
                return <img className="icon-img" src={unknow}/>;

        }

    }
}
