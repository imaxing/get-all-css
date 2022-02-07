export default async function () {
  const links = Array.from(document.querySelectorAll("link"))
    .map((item) => item.href)
    .filter((item) => item.endsWith(".css"));

  const styleTagsCss = Array.from(document.querySelectorAll("style"))
    .map((item) => item.innerText)
    .join("");

  const nativeGet = (url) => {
    return new Promise((resolve) => {
      const xhr = new XMLHttpRequest();
      xhr.onreadystatechange = () => {
        xhr.readyState === 4 && xhr.status === 200 && resolve(xhr.responseText);
      };
      xhr.open("GET", url);
      xhr.send();
    });
  };

  const linksStyleCss = await links.reduce(async (res, cur) => {
    res += await nativeGet(cur);
    return res;
  }, "");

  return (linksStyleCss + styleTagsCss).replace(/\[object Promise\]/g, "");
}
