type Prop = {
  params: { id: number };
};

export default async function Counter({ params }: Prop) {
  const { id } = await params;

  // const counter=await counterFindUnique({id:Number(id)});
  const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/prisma/find-unique`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ where: { id: Number(id) } }),
  });
  const data = await res.json();

  if (data.success) {
    const counter=data.res;
    return (
      <>
        <div className="container">
          カウンターの詳細ページです
          <br />
          params：{id}
          カウンター名：{counter.counter_name_ja}
        </div>
      </>
    );
  } else {
    return (
      <>
        <p>このカウンターは存在していません。</p>;
      </>
    );
  }
}
