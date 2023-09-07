"use client";
export default function Dates({ params }: { params: { id: string } }) {
  console.log(params);
  return <div>图片空间{params.id}</div>;
}
