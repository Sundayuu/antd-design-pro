import request from '@/utils/request';
interface TableListParams {
  sorter?: string;
  status?: string;
  name?: string;
  desc?: string;
  key?: number;
  pageSize?: number;
  currentPage?: number;
}

export async function queryRule(params?: TableListParams) {
  return request('/api/myrule', {
    params,
  });
}
