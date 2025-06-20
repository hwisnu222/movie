import {
  Pagination as PaginationParent,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useEffect, useState, type Dispatch, type SetStateAction } from "react";

type PaginatioProps = {
  count: number | undefined;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
};

const SEQUENCE_LIMIT = 3;

const sequences = (num: number, sequence = SEQUENCE_LIMIT + 1) => {
  const numFirst = Math.max(1, num - sequence + 1);

  return Array.from({ length: sequence }, (_, i) => numFirst + i);
};

export function Pagination(props: PaginatioProps) {
  const { page, count, setPage } = props;
  const [sequence, setSequence] = useState(3);

  const changePagination = (type: string) => {
    if (type === "INCREMENT") {
      setPage(props.page + 1);
      return;
    } else {
      setPage(props.page - 1);
      if (page === sequence - SEQUENCE_LIMIT) {
        setSequence((prev) => prev - SEQUENCE_LIMIT);
      }
    }
  };

  useEffect(() => {
    if (page === sequence) {
      setSequence((prev) => prev + SEQUENCE_LIMIT);
    }
  }, [page]);

  return (
    <PaginationParent className="my-8">
      <PaginationContent>
        {page > 1 && (
          <PaginationItem className="cursor-pointer">
            <PaginationPrevious onClick={() => changePagination("")} />
          </PaginationItem>
        )}

        {sequences(sequence).map((item: number, index: number) => (
          <PaginationItem key={index}>
            <PaginationLink
              className="cursor-pointer"
              isActive={page === item}
              onClick={() => setPage(item)}
            >
              {item}
            </PaginationLink>
          </PaginationItem>
        ))}
        {count !== page && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}
        <PaginationItem className="cursor-pointer">
          <PaginationNext onClick={() => changePagination("INCREMENT")} />
        </PaginationItem>
      </PaginationContent>
    </PaginationParent>
  );
}
