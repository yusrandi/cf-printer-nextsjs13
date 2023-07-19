'use client'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import { BarList, Button, Card, Flex, Grid, Metric, Text, Title } from '@tremor/react'
import Chart from '@/components/chart'
import { useEffect, useState } from 'react';
import { Evidence, Kerusakan } from 'prisma/prisma-client';

const website = [
  { name: '/home', value: 1230 },
  { name: '/contact', value: 751 },
  { name: '/gallery', value: 471 },
  { name: '/august-discount-offer', value: 280 },
  { name: '/case-studies', value: 78 }
];

const shop = [
  { name: '/home', value: 453 },
  { name: '/imprint', value: 351 },
  { name: '/shop', value: 271 },
  { name: '/pricing', value: 191 }
];

const app = [
  { name: '/shop', value: 789 },
  { name: '/product-features', value: 676 },
  { name: '/about', value: 564 },
  { name: '/login', value: 234 },
  { name: '/downloads', value: 191 }
];

const data = [
  {
    category: 'Website',
    stat: '10,234',
    data: website
  },
  {
    category: 'Online Shop',
    stat: '12,543',
    data: shop
  },
  {
    category: 'Mobile App',
    stat: '2,543',
    data: app
  }
];

const dataFormatter = (number: number) =>
  Intl.NumberFormat('us').format(number).toString();



const categories: {
  title: string;
  metric: string;
  metricPrev: string;
}[] = [
    {
      title: 'Kerusakan',
      metric: '$ 12,699',
      metricPrev: '$ 9,456'
    },
    {
      title: 'Evidence',
      metric: '$ 40,598',
      metricPrev: '$ 45,564'
    },
    {
      title: 'Pengetahuan',
      metric: '1,072',
      metricPrev: '856'
    }
  ];



export default function HomePage() {

  const [kerusakans, setKerusakans] = useState<Kerusakan[]>([]);
  const [evidences, setEvidences] = useState<Evidence[]>([]);
  const [pengetahuans, setPengetahuans] = useState<Evidence[]>([]);
  const [isLoading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    getKerusakans()
  }, [])
  useEffect(() => {
    getEvidences()
  }, [])
  useEffect(() => {
    getPengetahuans()
  }, [])

  async function getKerusakans() {
    setLoading(true)
    const result = await fetch('/api/kerusakan', { headers: { 'Cache-Control': 'no-cache' } })
      .then((res) => res.json());
    // console.log(result.responsedata);
    setKerusakans(result.responsedata)
    setLoading(false)
    return result
  }
  async function getEvidences() {
    setLoading(true)
    const result = await fetch('/api/evidence', { headers: { 'Cache-Control': 'no-cache' } })
      .then((res) => res.json());
    // console.log(result.responsedata);
    setEvidences(result.responsedata)
    setLoading(false)
    return result
  }
  async function getPengetahuans() {
    setLoading(true)
    const result = await fetch('/api/pengetahuan', { headers: { 'Cache-Control': 'no-cache' } })
      .then((res) => res.json());
    // console.log(result.responsedata);
    setPengetahuans(result.responsedata)
    setLoading(false)
    return result
  }

  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <Title>Dashboard</Title>
      <Text>
        Diagnosa Kerusakan Printer Menggunakan Metode Certainty Factor.
      </Text>
      <Grid className="gap-6 mt-6" numColsSm={2} numColsLg={3}>
        <Card >
          <Flex alignItems="start">
            <Text>Data Kerusakan</Text>
          </Flex>
          <Flex
            className="space-x-3 truncate"
            justifyContent="start"
            alignItems="baseline"
          >
            <Metric>{kerusakans.length}</Metric>
            <Text className="truncate">data</Text>
          </Flex>
        </Card>
        <Card >
          <Flex alignItems="start">
            <Text>Data Evidence</Text>
          </Flex>
          <Flex
            className="space-x-3 truncate"
            justifyContent="start"
            alignItems="baseline"
          >
            <Metric>{evidences.length}</Metric>
            <Text className="truncate">data</Text>
          </Flex>
        </Card>
        <Card >
          <Flex alignItems="start">
            <Text>Data Basis Pengetahuan</Text>
          </Flex>
          <Flex
            className="space-x-3 truncate"
            justifyContent="start"
            alignItems="baseline"
          >
            <Metric>{pengetahuans.length}</Metric>
            <Text className="truncate">data</Text>
          </Flex>
        </Card>
      </Grid>

      {/* <Grid className="mt-8 gap-6" numColsSm={2} numColsLg={3}>
        {data.map((item) => (
          <Card key={item.category}>
            <Title>{item.category}</Title>
            <Flex
              className="space-x-2"
              justifyContent="start"
              alignItems="baseline"
            >
              <Metric>{item.stat}</Metric>
              <Text>Total views</Text>
            </Flex>
            <Flex className="mt-6">
              <Text>Pages</Text>
              <Text className="text-right">Views</Text>
            </Flex>
            <BarList
              className="mt-2"
              data={item.data}
              valueFormatter={dataFormatter}
            />
          </Card>
        ))}
      </Grid> */}


      <Chart />
    </main>
  )
}
