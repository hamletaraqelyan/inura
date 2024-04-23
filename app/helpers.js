function isMacBook() {
  const userAgent = navigator.userAgent.toLowerCase();
  return (
    userAgent.indexOf("macintosh") !== -1 &&
    userAgent.indexOf("intel mac os x") !== -1
  );
}

const isAndroid = () => /Android/i.test(navigator.userAgent);

function isDesktopSize() {
  const width = $(window).width();
  const minWidth = 1024;
  return width > minWidth;
}
