import ejs from "ejs";

export const renderEjsTemplate = (
  templatePath: string,
  data: any
): Promise<string> => {
  return new Promise((resolve, reject) => {
    ejs.renderFile(templatePath, data, (err, html) => {
      if (err) {
        reject(err);
      } else {
        resolve(html);
      }
    });
  });
};
