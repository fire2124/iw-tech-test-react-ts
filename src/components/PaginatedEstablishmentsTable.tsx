import { useState, useEffect } from "react";
import { EstablishmentsTable } from "./EstablishmentsTable";
import { EstablishmentsTableNavigation } from "./EstablishmentsTableNavigation";
import {
  getEstablishmentRatings,
  getFilteredEstablishmentRatings,
} from "../services/ratingsAPI";

const tableStyle = {
  background: "rgba(51, 51, 51, 0.9)",
  padding: "10px",
  width: "max-content",
  marginLeft: "50px",
  color: "white",
};

const labelFood = "Food Hygiene Ratings";

export const PaginatedEstablishmentsTable: React.FC<{
  pageNum: number;
  setPageNum: any;
  error: any;
  setError: any;
  selectedAuthority: string;
  selectedCountry: string;
  resetFilter: boolean;
  setResetFilter: any;
}> = ({
  pageNum,
  setPageNum,
  error,
  setError,
  selectedAuthority,
  selectedCountry,
  resetFilter,
  setResetFilter
}) => {
  let initialState = {
    data: [],
    headerAttr: {
      BusinessName: "BusinessName",
      RatingValue: "RatingValue",
      Favorite: "Favorite",
    },
    isLoading: false,
  };
  const [state, setState] = useState<{
    data: { [key: string]: string }[];
    headerAttr: { BusinessName: string; RatingValue: string; Favorite: string };
    isLoading: boolean;
  }>(initialState);

  const [pageCount] = useState(100);

  useEffect(() => {
    setState({ ...state, isLoading: true });
    getAllEstablishments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (resetFilter === true) {
      setState({ ...state, isLoading: true });
      getAllEstablishments();
      setResetFilter(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resetFilter]);

  useEffect(() => {
    if (
      (selectedAuthority !== undefined && selectedAuthority.length > 0) ||
      (selectedCountry !== undefined && selectedCountry.length > 0)
    ) {
      setState({ ...state, isLoading: true });
      getFilteredEstablishmentRatings(
        pageNum,
        selectedAuthority !== undefined ? selectedAuthority.toString() : "",
        selectedCountry !== undefined ? selectedCountry.toString() : ""
      ).then(
        (result) => {
          setState({
            ...state,
            data: result?.establishments,
            isLoading: false,
          });
        },
        (error) => {
          setState({ ...state, isLoading: false });
          setError(error);
        }
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCountry, selectedAuthority]);

  async function handlePreviousPage() {
    pageNum > 1 && setPageNum(pageNum - 1);
    setState({ ...state, isLoading: true });
    getEstablishmentRatings(pageNum).then(
      (result) => {
        setState({ ...state, data: result?.establishments, isLoading: false });
      },
      (error) => {
        setState({ ...state, isLoading: false });
        setError(error);
      }
    );
  }

  async function handleNextPage() {
    pageNum < pageCount && setPageNum(pageNum + 1);
    setState({ ...state, isLoading: true });
    getEstablishmentRatings(pageNum).then(
      (result) => {
        setState({ ...state, data: result?.establishments, isLoading: false });
      },
      (error) => {
        setState({ ...state, isLoading: false });
        setError(error);
      }
    );
  }

  const getAllEstablishments = async () => {
    getEstablishmentRatings(pageNum).then(
      (result) => {
        setState({ ...state, data: result?.establishments, isLoading: false });
      },
      (error) => {
        setState({ ...state, isLoading: false });
        setError(error);
      }
    );
  };

  if (error) {
    return <div>Error: {error.message}</div>;
  } else {
    return (
      <>
        <main style={tableStyle}>
          <h2>{labelFood}</h2>
          <EstablishmentsTable state={state} />
          <EstablishmentsTableNavigation
            pageNum={pageNum}
            pageCount={pageCount}
            onPreviousPage={handlePreviousPage}
            onNextPage={handleNextPage}
          />
        </main>
      </>
    );
  }
};
