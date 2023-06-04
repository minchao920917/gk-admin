import { createProdMockServer } from 'vite-plugin-mock/es/createProdMockServer'
//https://cn.vitejs.dev/guide/features.html#glob-import

import fg from 'fast-glob';


export const setupProdMockServer = async () => {

  const mockFiles = await fg('./mock/controller/*.js');

  const modules = await Promise.all(
    mockFiles.map(async (file) => {
      const { default: mock } = await import(`${file}`);
      return mock;
    })
  );

  //创建prod mock server
  createProdMockServer([...modules])
}
