
import React, { useState } from "react";

export default function Test ({ apitoken })
{
  const [page, setPage] = useState(1);

  return (
    <div>
      { apitoken }
    </div>
  );
};

