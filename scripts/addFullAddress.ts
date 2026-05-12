import prisma from "@/lib/prisma";
import { getPrefName } from "@/utils/counter/counterFuns";

async function addFullAddress() {
  const countersId = await prisma.counter.findMany();

  countersId.forEach((c) => {
    const fullAddress =
      getPrefName(String(c.pref_code) + String(c.city_code)) + c.address_ja;

    async function update() {
      const upDateCounter = await prisma.counter.update({
        where: { id: c.id },
        data: { x_full_address_ja: fullAddress },
      });
    }
    update();
  });
}
addFullAddress();
