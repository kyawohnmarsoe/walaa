import { Link } from "@inertiajs/react";

export default function Stats({ stats, filterURL }) {

  return (
    <div className="stats shadow text-center md:basis-1/6 basis-1/4 mx-2 mb-3">
      <Link href={filterURL}>
        <div className="stat py-1">
          <div className="stat-value text-xl" style={{ color: stats?.itemColor }}>{stats?.itemValue}</div>
          <div className="stat-title text-sm">{stats?.itemName}</div>
          {/* <div className="stat-desc">21% more than last month</div> */}
        </div>
      </Link>
    </div>
  )
}





