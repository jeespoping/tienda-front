import React from "react";
import { Pagination as PaginationSU } from "semantic-ui-react";
import { useRouter } from "next/router";
import queryString from "query-string";

export default function Pagination({ totalGames, page, limitPerPage }) {
  const totalPages = Math.ceil(totalGames / limitPerPage);
  const router = useRouter();
  const urlParse = queryString.parseUrl(router.asPath);

  const goToPage = (newPage) => {
    urlParse.query.page = newPage;
    let myImage = new Image();
    myImage.src = objectURL;
    document.getElementById("myImg").appendChild(myImage);
  };

  return (
    <div className="pagination">
      <PaginationSU
        defaultActivePage={page}
        totalPages={totalPages}
        lastItem={null}
        onPageChange={(_, data) => goToPage(data.activePage)}
        firstItem={null}
        boundaryRange={0}
        siblingRange={1}
        ellipsisItem={null}
      />
    </div>
  );
}
