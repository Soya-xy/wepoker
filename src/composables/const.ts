export const columnsConfig = [
  {
    title: '序号',
    field: 'xh',
  },
  {
    title: '单位',
    field: 'dw',
  },
  {
    title: '稽核成效',
    field: 'jhcj',
    children: [
      {
        title: '部平台',
        field: 'jhcj-bpt',
        children: [
          {
            title: '发起工单',
            field: 'jhcj-bpt-fqgd',
          },
          {
            title: '发起路径',
            field: 'jhcj-bpt-fqlj',
          },
        ],
      },
      {
        title: '省平台',
        field: 'jhcj-spt',
        children: [
          {
            title: '核实逃费车辆',
            field: 'jhcj-spt-hstfcl',
          },
          {
            title: '核实逃费路径',
            field: 'jhcj-spt-hstflj',
          },
          {
            title: '核实逃费金额',
            field: 'jhcj-spt-hstfje',
          },
        ],
      },
      {
        title: '车道拦截治理',
        field: 'jhcj-cdljzl',
        children: [
          {
            title: '次数',
            field: 'jhcj-cdljzl-cs',
          },
          {
            title: '金额',
            field: 'jhcj-cdljzl-je',
          },
        ],
      },
      {
        title: '拦截补费',
        field: 'jhcj-ljbf',
        children: [
          {
            title: '部级补费',
            field: 'jhcj-ljbf-bjbf',
          },
          {
            title: '补费金额',
            field: 'jhcj-ljbf-bfje',
          },
          {
            title: '省级稽核',
            field: 'jhcj-ljbf-sjjh',
          },
          {
            title: '补费金额',
            field: 'jhcj-ljbf-bfje',
          },
        ],
      },
      {
        title: '升档',
        field: 'jhcj-sd',
        children: [
          {
            title: '辆数',
            field: 'jhcj-sd-ls',
          },
          {
            title: '金额',
            field: 'jhcj-sd-je',
          },
        ],
      },
    ],
  },
  {
    title: '内部指标',
    field: 'nbzb',
    children: [
      {
        title: '入口CPC误判',
        field: 'nbzb-rkcpcwp',
      },
      {
        title: 'CPC兜底倒查入口',
        field: 'nbzb-cpcdddcrc',
      },
      {
        title: '特情操作',
        field: 'nbzb-tqcz',
        children: [
          {
            title: '违规降档',
            field: 'nbzb-tqcz-wgjd',
          },
          {
            title: '兜底',
            field: 'nbzb-tqcz-dd',
          },
          {
            title: '手动落杆（入口）',
            field: 'nbzb-tqcz-sdlg-rk',
          },
          {
            title: '手动落杆（出口）',
            field: 'nbzb-tqcz-sdlg-ck',
          },
          {
            title: '入口丢轴',
            field: 'nbzb-tqcz-rkdz',
          },
        ],
      },
    ],
  },
  {
    title: '追缴规范',
    field: 'zjgf',
    children: [
      {
        title: '稽核退费',
        field: 'zjgf-jhtf',
        children: [
          {
            title: '部级',
            field: 'zjgf-jhtf-bj',
          },
          {
            title: '省级',
            field: 'zjgf-jhtf-sj',
          },
        ],
      },
      {
        title: '工单撤销',
        field: 'zjgf-gdcx',
        children: [
          {
            title: '部级',
            field: 'zjgf-gdcx-bj',
          },
          { title: '省级', field: 'zjgf-gdcx-sj' },
        ],
      },
      {
        title: '追缴规范性',
        field: 'zjgf-zjgfx',
        children: [
          { title: '部级发起', field: 'zjgf-zjgfx-bjfq' },
          { title: '省级核实', field: 'zjgf-zjgfx-sjhs' },
          { title: '现场录入', field: 'zjgf-zjgfx-xclr' },
        ],
      },
    ],
  },
  {
    title: '其他',
    field: 'qt',
    children: [
      {
        title: '专项（专案）开展情况',
        field: 'qt-zxkzqk',
      },
      {
        title: '本单位出口逃费车辆未治理',
        field: 'qt-bdwkzlc',
      },
      {
        title: '部平台有责赔付工单',
        field: 'qt-bptyzpf',
      },
    ],
  },
]

export function fake() {
  const data: any = []

  const dws = ['安阳北收费站', '安阳收费站', '安阳南收费站', '鹤壁北收费站', '鹤壁收费站', '鹤壁南收费站', '卫辉收费站', '朝歌收费站', '狮豹头收费站', '林州万泉湖收费站', '万仙山收费站', '滑县留固收费站', '滑县物流港南收费站', '滑县南收费站', '延津北收费站', '卫辉东收费站', '望京楼收费站', '朝歌集中监控分中心', '滑县南集中监控分中心', '望京楼集中监控分中心']

  dws.forEach((dw) => {
    const d: any = {}
    'xh,dw,jhcj,jhcj-bpt,jhcj-bpt-fqgd,jhcj-bpt-fqlj,jhcj-spt,jhcj-spt-hstfcl,jhcj-spt-hstflj,jhcj-spt-hstfje,jhcj-cdljzl,jhcj-cdljzl-cs,jhcj-cdljzl-je,jhcj-ljbf,jhcj-ljbf-bjbf,jhcj-ljbf-bfje,jhcj-ljbf-sjjh,jhcj-sd,jhcj-sd-ls,jhcj-sd-je,nbzb,nbzb-rkcpcwp,nbzb-cpcdddcrc,nbzb-tqcz,nbzb-tqcz-wgjd,nbzb-tqcz-dd,nbzb-tqcz-sdlg-rk,nbzb-tqcz-sdlg-ck,nbzb-tqcz-rkdz,zjgf,zjgf-jhtf,zjgf-jhtf-bj,zjgf-jhtf-sj,zjgf-gdcx,zjgf-gdcx-bj,zjgf-gdcx-sj,zjgf-zjgfx,zjgf-zjgfx-bjfq,zjgf-zjgfx-sjhs,zjgf-zjgfx-xclr,qt,qt-zxkzqk,qt-bdwkzlc,qt-bptyzpf'.split(',').forEach((field) => {
      if (field === 'dw')
        d.dw = dw
      else
        d[field] = Math.floor(Math.random() * 100)
    })
    data.push(d)
  })
  return data
}

export function mapColumns(columns = columnsConfig): any {
  return columns.map((column) => {
    // 基本的列结构
    const colStructure: any = {
      title: column.title,
      headerStyle: { textAlign: 'center' },
      width: 'auto',
      field: column.field, // 这里应该是每个列的唯一标识符
    }

    // 如果列有子列，递归处理
    if (column.children && column.children.length)
      colStructure.columns = mapColumns(column.children)

    return colStructure
  })
}
