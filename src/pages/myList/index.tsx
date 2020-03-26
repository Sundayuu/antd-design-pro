import { DownOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Divider, Dropdown, Menu, message } from 'antd';
import React, { useState, useEffect } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable, { ProColumns } from '@ant-design/pro-table';
import { TableListItem } from './data';
import { Dispatch, AnyAction } from 'redux';
import { connect } from 'dva';
interface myListPropsType {
  dispatch: Dispatch<AnyAction>;
  listData: Array<any>;
}

const TableList: React.FC<myListPropsType> = ({ dispatch, listData }) => {
  useEffect(() => {
    dispatch({
      type: 'myList/fetchMyList',
      payload: {
        current: 1,
        pageSize: 10,
      },
    });
  }, []);
  const columns: ProColumns<TableListItem>[] = [
    {
      title: '规则名称',
      dataIndex: 'name',
      rules: [
        {
          required: true,
          message: '规则名称为必填项',
        },
      ],
    },
    {
      title: '描述',
      dataIndex: 'desc',
      valueType: 'textarea',
    },
    {
      title: '服务器调用次数',
      dataIndex: 'callNo',
      renderText: (val: string) => `${val} 万`,
    },
    {
      title: '状态',
      dataIndex: 'status',
      hideInForm: true,
      valueEnum: {
        0: { text: '关闭', status: 'Default' },
        1: { text: '运行中', status: 'Processing' },
        2: { text: '已上线', status: 'Success' },
        3: { text: '异常', status: 'Error' },
      },
    },
    {
      title: '上次调度时间',
      dataIndex: 'updatedAt',
      sorter: true,
      valueType: 'dateTime',
      hideInForm: true,
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => (
        <>
          <a href="javascript:;" onClick={() => {}}>
            配置
          </a>
          <Divider type="vertical" />
          <a href="javascript:;">订阅警报</a>
        </>
      ),
    },
  ];
  return (
    <PageHeaderWrapper>
      <ProTable
        headerTitle="查询表格"
        // actionRef={actionRef}
        rowKey="key"
        onChange={() => {}}
        toolBarRender={() => [
          <Button type="primary">
            {' '}
            <PlusOutlined /> 新建
          </Button>,
        ]}
        columns={columns}
        dataSource={listData}
        rowSelection={{}}
        tableAlertRender={(selectedRowKeys, selectedRows) => (
          <div>
            已选择 <a style={{ fontWeight: 600 }}>{selectedRowKeys.length}</a> 项&nbsp;&nbsp;
            <span>
              服务调用次数总计 {selectedRows.reduce((pre, item) => pre + item.callNo, 0)} 万
            </span>
          </div>
        )}
      />
    </PageHeaderWrapper>
  );
};
const mapStateToProps = (state: any) => ({
  listData: state.listData,
});

export default connect(mapStateToProps)(TableList);
