export const randomString = function (length, chars) {
      let mask = '';
      if (chars.indexOf('a') > -1) mask += 'abcdefghijklmnopqrstuvwxyz';
      if (chars.indexOf('A') > -1) mask += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      if (chars.indexOf('#') > -1) mask += '0123456789';
      if (chars.indexOf('!') > -1) mask += '~`!@#$%^&*()_+-={}[]:";\'<>?,./|\\';
      let result = '';
      for (let i = length; i > 0; --i)
            result += mask[Math.round(Math.random() * (mask.length - 1))];
      return result;
};

export const contentTypeCheck = function (str, pattern) {
      const [type] = str.split('/');

      if (type === 'image') return 'image';
      if (type === 'csv') return 'csv';
      if (type === 'application') return 'doc';

      return '';
};

export const formatBytes = function (bytes, decimals = 2) {
      if (!+bytes) return '0 Bytes';

      const k = 1024;
      const dm = decimals < 0 ? 0 : decimals;
      const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

      const i = Math.floor(Math.log(bytes) / Math.log(k));

      return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
};

export const randomColor = function () {
      const cl = [
            'rgba(236,100,75,1)',
            'rgba(210, 77, 87,1)',
            'rgba(242, 38, 19,1)',
            'rgba(150, 40, 27,1)',
            'rgba(239, 72, 54,1)',
            'rgba(214, 69, 65,1)',
            'rgba(192, 57, 43,1)',
            'rgba(207, 0, 15,1)',
            'rgba(231, 76, 60,1)',
            'rgba(219, 10, 91,1)',
            'rgba(246, 71, 71,1)',
            'rgba(241, 169, 160,1)',
            'rgba(210, 82, 127,1)',
            'rgba(224, 130, 131,1)',
            'rgba(246, 36, 89,1)',
            'rgba(226, 106, 106,1)',
            'rgba(220, 198, 224,1)',
            'rgba(102, 51, 153,1)',
            'rgba(103, 65, 114,1)',
            'rgba(174, 168, 211,1)',
            'rgba(145, 61, 136,1)',
            'rgba(154, 18, 179,1)',
            'rgba(191, 85, 236,1)',
            'rgba(190, 144, 212,1)',
            'rgba(142, 68, 173,1)',
            'rgba(155, 89, 182,1)',
            'rgba(68,108,179,1)',
            'rgba(228, 241, 254,1)',
            'rgba(65, 131, 215,1)',
            'rgba(89, 171, 227,1)',
            'rgba(129, 207, 224,1)',
            'rgba(82, 179, 217,1)',
            'rgba(197, 239, 247,1)',
            'rgba(34, 167, 240,1)',
            'rgba(52, 152, 219,1)',
            'rgba(44, 62, 80,1)',
            'rgba(25, 181, 254,1)',
            'rgba(25, 181, 254,1)',
            'rgba(34, 49, 63,1)',
            'rgba(107, 185, 240,1)',
            'rgba(30, 139, 195,1)',
            'rgba(58, 83, 155,1)',
            'rgba(52, 73, 94,1)',
            'rgba(103, 128, 159,1)',
            'rgba(37, 116, 169,1)',
            'rgba(78,205,196,1)',
            'rgba(162, 222, 208,1)',
            'rgba(135, 211, 124,1)',
            'rgba(38, 166, 91,1)',
            'rgba(3, 201, 169,1)',
            'rgba(104, 195, 163,1)',
            'rgba(101, 198, 187,1)',
            'rgba(27, 188, 155,1)',
            'rgba(27, 163, 156,1)',
            'rgba(102, 204, 153,1)',
            'rgba(54, 215, 183,1)',
            'rgba(200, 247, 197,1)',
            'rgba(134, 226, 213,1)',
            'rgba(235, 149, 50,1)',
      ];

      return cl[Math.floor(Math.random() * cl.length)];
};
