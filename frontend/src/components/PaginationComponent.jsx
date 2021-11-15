import React from 'react';
import { Pagination, Badge } from 'react-bootstrap';

function PaginationComponent({currentLink, previousLink, nextLink, linkClickHandler, total}) {
    const linkClicked = (linkHref) => {
        linkClickHandler(linkHref);
    }

    if (currentLink === null) {
        return null;
    }

    const url = new URL(currentLink);

    let pageNumber = 1;
    if (url.searchParams.has("page")) {
        pageNumber = url.searchParams.get("page");
    }

    return (
        <div>
            <div>
                <Pagination>
                    <Pagination.Item disabled={previousLink === null} onClick={() => { linkClicked(previousLink) }}>Previous</Pagination.Item>
                    <Pagination.Item disabled={nextLink === null} onClick={() => { linkClicked(nextLink) }}>Next</Pagination.Item>
                </Pagination>
                <div>
                    <span>(Total: <Badge bg="secondary">{ total }</Badge>)</span><br/>
                    <span>(Current Page: <Badge bg="secondary">{ pageNumber }</Badge>)</span>
                </div>
                <br/>
            </div>
        </div>
    )
}

export default PaginationComponent
