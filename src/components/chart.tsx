'use client';

import { Card, AreaChart, Title, Text } from '@tremor/react';

const data = [
  {
    Month: 'Jan',
    Mainboard: 2890,
    PrintHead: 2400
  },
  {
    Month: 'Feb',
    Mainboard: 1890,
    PrintHead: 1398
  },
  {
    Month: 'Maret',
    Mainboard: 3890,
    PrintHead: 2980
  },
  {
    Month: 'April',
    Mainboard: 1890,
    PrintHead: 980
  },
  {
    Month: 'Mei',
    Mainboard: 1190,
    PrintHead: 2180
  }
];

const valueFormatter = (number: number) =>
  `$ ${Intl.NumberFormat('us').format(number).toString()}`;

export default function Chart() {
  return (
    <Card className="mt-8">
      <Title>Diagnosa</Title>
      <Text>Riwayat konsultasi dari user</Text>
      <AreaChart
        className="mt-4 h-80"
        data={data}
        categories={['Mainboard', 'PrintHead']}
        index="Month"
        colors={['indigo', 'fuchsia']}
      // valueFormatter={valueFormatter}
      />
    </Card>
  );
}
