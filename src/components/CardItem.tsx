import React from "react";
import "./card-item.scss";

export type ICardItemProps = {
 selected: boolean;
 navigateFolder: () => void;
 nbfolders: any[];
 folder: any;
 placeholder: string;
 mutipleFolders: any;
 emptyFolder: any;
 folderIcon: any;
};

const CardItem: React.FC<ICardItemProps> = ({
 selected,
 navigateFolder,
 nbfolders,
 folder,
 placeholder,
 mutipleFolders,
 emptyFolder,
 folderIcon,
}) => {
 const getSubFolders = (e: any) => {};
 return (
  <div
   className={selected ? "one_folder one_folder_selected" : "one_folder"}
   onClick={navigateFolder}
  >
   {(folder && folder.product && folder.products.length > 0) ||
   nbfolders.length > 0 ? (
    <div className="list_folder_elements">
     {folder &&
      folder.products &&
      folder.products.map((product: any, i: number) =>
       i < 7 ? (
        <div key={i} className="product_image_container">
         {product.image ? (
          <img
           src={
            process.env.REACT_APP_STORAGE_URL + product.image.path ||
            placeholder
           }
           alt=""
           className="img_product_folder"
          />
         ) : (
          <img src={placeholder} alt="" className="img_product_folder" />
         )}
        </div>
       ) : null
      )}

     {folder.folders_count
      ? nbfolders.map((el: any, i: number) => (
         <div key={i} className=" product_image_container folders_indicator">
          <img className="folder" />
         </div>
        ))
      : null}

     {folder && folder.products && folder.products.length > 7 && (
      <div className=" product_image_container product_image_container_plus">
       <p className="paragraphe products_plus_folder_value ">
        +{folder.products.length - 8}
       </p>
      </div>
     )}
    </div>
   ) : (
    <div className="list_folder_elements empty_folder">
     <p className="paragraphe">Empty Folder</p>
    </div>
   )}
   {folder &&
   folder.products &&
   folder.products.length === 0 &&
   folder.folders_count === 0 ? (
    <div className="folder_footer">
     <img src={emptyFolder} />
     <p className="folder_name" onClick={(e) => getSubFolders(e)}>
      {folder.name}
     </p>
    </div>
   ) : folder.folders_count === 0 ? (
    <div className="folder_footer">
     <img src={folderIcon} />
     <p className="folder_name" onClick={(e) => getSubFolders(e)}>
      {folder.name}
     </p>
    </div>
   ) : (
    <div className="folder_footer">
     <img src={mutipleFolders} />
     <p className="folder_name" onClick={(e) => getSubFolders(e)}>
      {folder.name}
     </p>
    </div>
   )}
  </div>
 );
};

export { CardItem };
