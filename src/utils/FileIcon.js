/**
 * Created by jiuyuehe on 2017/9/15.
 */

import React, {Component} from 'react';

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
            return <img className="icon-img" src={require('../assets/images/file/icon_list_folder.png')}/>
        }

        let fileExt = this.getFileExtenName(file.fileName);

        switch (fileExt) {

            case 'pdf' :
                return <img className="icon-img" src={require('../assets/images/file/icon_list_pdf.png')}/>;

            case 'txt' :
                return <img className="icon-img" src={require('../assets/images/file/icon_list_txtfile.png')}/>;

            case 'doc' :
            case 'docx':
                return <img className="icon-img" src={require('../assets/images/file/icon_list_doc.png')}/>;
            case 'vsd':
            case 'vsdx':
                return <img className="icon-img" src={require('../assets/images/file/icon_list_visio.png')}/>;

            case 'pptm':
            case 'pps':
            case 'pptx' :
            case 'ppt' :
                return <img className="icon-img" src={require('../assets/images/file/icon_list_ppt.png')}/>;

            case 'xlsx':
            case 'xlt' :
            case 'xltm':
            case 'xlsm':
            case 'xlts':
            case 'xlw' :
            case 'xls' :
                return <img className="icon-img" src={require('../assets/images/file/icon_list_excel.png')}/>;

            case 'ai' :
            case 'cdr':
            case 'wmf':
            case 'psd' :
            case 'eps' :
                return <img className="icon-img" src={require('../assets/images/file/icon_list_image.png')}/>;
            case 'png':
                return <img className="icon-img" src={require('../assets/images/file/icon_list_image.png')}/>;

            case 'jpg':
                return <img className="icon-img" src={require('../assets/images/file/icon_list_image.png')}/>;
            case 'apk':
                return <img className="icon-img" src={require('../assets/images/file/icon_list_apk.png')}/>;
            case 'rar':
            case 'zip':
            case 'iso':
            case 'exe':
                return <img className="icon-img" src={require('../assets/images/file/icon_list_compressfile.png')}/>;
            case 'avi':
            case 'mp4':
                return <img className="icon-img" src={require('../assets/images/file/icon_list_videofile.png')}/>;

            case 'mp3':
                return <img className="icon-img" src={require('../assets/images/file/icon_list_music.png')}/>;

            case 'rtf':
                return <img className="icon-img" src={require('../assets/images/file/icon_list_pdf.png')}/>;

            default :
                return <img className="icon-img" src={require('../assets/images/file/icon_list_unknown.png')}/>;

        }

    }
}
