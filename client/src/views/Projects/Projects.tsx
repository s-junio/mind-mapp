import React, { KeyboardEvent, useEffect, useState } from 'react';
import ListData from '../../components/ListData/ListData';
import MInput from '../../components/MInput/MInput';
import { useHistory } from 'react-router-dom';

import './Projects.css';
import DataManager from '../../DataManager';

const DataInstance = DataManager.Instance;

interface Coords {
  x: number;
  y: number;
}

interface Project {
  _id: string;
  title: string;
}

function Projects() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [list, setList] = useState<Project[]>([]);
  const [animCoords, setAnimCoords] = useState<Coords>({ x: 0, y: 0 });

  useEffect(() => {
    const fetchData = async () => {
      const result: any = await DataInstance.getProjects();
      setIsLoading(false);
      setList(result);
    };

    fetchData();
  }, []);

  const handleSearch = async (ev: KeyboardEvent) => {
    const target: any = ev.target;
    setIsLoading(true);

    if (ev.target) {
      const value = target.value.toLowerCase();
      if (value) {
        const projectsFiltered: any = await DataInstance.filterProjects(value);
        setList(projectsFiltered);
      } else {
        const allProjects: any = await DataInstance.getProjects();
        setList(allProjects);
      }
    }
    setIsLoading(false);
  };

  const history = useHistory();

  const navigate = (id: string, coords: Coords) => {
    setAnimCoords(coords);
    setTimeout(() => {
      history.push(`/mapp?id=${id}`);
    }, 500);
  };

  const removeProject = async (id: string) => {
    try {
      const result = await DataInstance.removeProject(id);
    }
    catch(err){
      console.log('Error:', err)
    }
    setList(list.filter((item) => item._id !== id));
    return Promise.resolve(true);
  };
  return (
        <div className="projects">
          <div className="project-list">
            <MInput name="Search..." onKeyUp={handleSearch}></MInput>
            <ListData
              list={list}
              isLoading={isLoading}
              handleArrow={navigate}
              handleDelete={removeProject}
            ></ListData>
          </div>
          {animCoords.x || animCoords.y ? (
            <div
              className="anim-helper"
              style={{ left: animCoords.x - 50, top: animCoords.y - 50 }}
            ></div>
          ) : null}
          <div className="undraw">
            <svg
              width="420"
              height="420"
              viewBox="0 0 591 647"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g
                id="undraw_Modern_professional_re_3b6l 1"
                clipPath="url(#clip0)"
              >
                <path
                  id="Vector"
                  d="M119.021 527.084C127.261 527.084 133.941 520.404 133.941 512.164C133.941 503.924 127.261 497.244 119.021 497.244C110.781 497.244 104.101 503.924 104.101 512.164C104.101 520.404 110.781 527.084 119.021 527.084Z"
                  fill="var(--neutral1)"
                />
                <path
                  id="Vector_2"
                  d="M91.4073 529.756C97.1877 529.756 101.874 525.07 101.874 519.29C101.874 513.509 97.1877 508.823 91.4073 508.823C85.6269 508.823 80.9409 513.509 80.9409 519.29C80.9409 525.07 85.6269 529.756 91.4073 529.756Z"
                  fill="var(--neutral1)"
                />
                <path
                  id="Vector_3"
                  d="M296.807 418.436C327.735 418.436 352.807 412.616 352.807 405.436C352.807 398.256 327.735 392.436 296.807 392.436C265.879 392.436 240.807 398.256 240.807 405.436C240.807 412.616 265.879 418.436 296.807 418.436Z"
                  fill="#3F3D56"
                />
                <path
                  id="Vector_4"
                  d="M341.733 534.942L287.733 538.935L287.88 540.93L341.881 536.936L341.733 534.942Z"
                  fill="#CACACA"
                />
                <path
                  id="Vector_5"
                  d="M252.289 528.06L251.325 529.812L271.325 540.812L272.289 539.06L252.289 528.06Z"
                  fill="#CACACA"
                />
                <path
                  id="Vector_6"
                  d="M308.807 520.936H290.807V522.936H308.807V520.936Z"
                  fill="#CACACA"
                />
                <path
                  id="Vector_7"
                  d="M243.805 646.004L241.809 645.868L256.809 416.868L258.805 417.004L243.805 646.004Z"
                  fill="#CACACA"
                />
                <path
                  id="Vector_8"
                  d="M317.808 645.985L307.808 434.985L309.806 434.887L319.806 645.887L317.808 645.985Z"
                  fill="#CACACA"
                />
                <path
                  id="Vector_9"
                  d="M337.804 415.854L335.811 416.018L354.81 646.018L356.804 645.854L337.804 415.854Z"
                  fill="#CACACA"
                />
                <path
                  id="Vector_10"
                  d="M274.807 645.96L272.807 645.912L278.807 434.912L280.807 434.96L274.807 645.96Z"
                  fill="#CACACA"
                />
                <path
                  id="Vector_11"
                  d="M265.236 513.691L251.954 521.557L215.29 474.07L234.894 462.459L265.236 513.691Z"
                  fill="#FFB6B6"
                />
                <path
                  id="shoeleft"
                  d="M276.249 524.559L233.422 549.925L233.101 549.383C230.483 544.962 229.728 539.682 231.002 534.704C232.277 529.727 235.476 525.459 239.897 522.841L239.898 522.84L266.056 507.348L276.249 524.559Z"
                  fill="#2F2E41"
                />
                <path
                  id="Vector_12"
                  d="M329.378 513.691L342.66 521.557L379.324 474.07L359.721 462.459L329.378 513.691Z"
                  fill="#FFB6B6"
                />
                <path
                  id="shoeright"
                  d="M328.559 507.348L354.716 522.84L354.717 522.841C359.138 525.459 362.337 529.727 363.612 534.704C364.886 539.682 364.131 544.962 361.513 549.383L361.192 549.925L318.365 524.559L328.559 507.348Z"
                  fill="#2F2E41"
                />
                <path
                  id="Vector_13"
                  d="M338.506 332.5C338.506 332.5 295.171 363.023 252.989 335.479L252.329 354.68C252.329 354.68 161.975 393 176.807 422.936C191.639 452.872 222.807 483.936 222.807 483.936L239.807 469.936L220.807 421.936L272.489 400.041L317.544 400.268L380.371 425.697L350.371 470.697L376.807 478.936C376.807 478.936 439.807 420.936 426.307 404.436C415.486 391.211 350.713 361.558 350.713 361.558L338.506 332.5Z"
                  fill="#2F2E41"
                />
                <path
                  id="shirt"
                  d="M353.587 220.527L316.078 208.094L306.807 194.936H279.807L271.808 208.302L237.027 220.527C235.131 221.069 233.502 222.293 232.452 223.963C231.403 225.632 231.007 227.631 231.341 229.575L246.807 356.936L271.807 354.936C271.807 354.936 305.489 381.218 325.807 350.936L326.892 335.665L347.807 355.936L359.273 229.575C359.607 227.631 359.211 225.632 358.162 223.962C357.112 222.293 355.483 221.069 353.587 220.527Z"
                  fill="#6C63FF"
                />
                <g id="head">
                  <path
                    id="hair"
                    d="M324.789 134.16C313.699 115.421 291.759 114.548 291.759 114.548C291.759 114.548 270.379 111.814 256.665 140.353C243.881 166.953 226.238 183.637 253.824 189.864L258.807 174.355L261.893 191.018C265.821 191.301 269.761 191.368 273.696 191.22C303.238 190.266 331.372 191.499 330.466 180.898C329.262 166.805 335.46 152.19 324.789 134.16Z"
                    fill="#2F2E41"
                  />
                  <path
                    id="Vector_15"
                    d="M294.307 189.855C310.323 189.855 323.307 176.871 323.307 160.855C323.307 144.839 310.323 131.855 294.307 131.855C278.291 131.855 265.307 144.839 265.307 160.855C265.307 176.871 278.291 189.855 294.307 189.855Z"
                    fill="#FFB8B8"
                  />
                </g>
                <path
                  id="Vector_16"
                  d="M320.886 131.353L299.21 119.999L269.277 124.644L263.084 151.997L278.5 151.404L282.807 141.355V151.239L289.921 150.965L294.049 134.966L296.63 151.997L321.919 151.481L320.886 131.353Z"
                  fill="#2F2E41"
                />
                <path
                  id="Vector_17"
                  opacity="0.2"
                  d="M248.989 248L271.489 335.991C271.489 335.991 260.989 259 248.989 248Z"
                  fill="black"
                />
                <path
                  id="Vector_18"
                  opacity="0.2"
                  d="M316.125 336.991L338.625 249C326.625 260 316.125 336.991 316.125 336.991Z"
                  fill="black"
                />
                <path
                  id="Vector_19"
                  d="M321.365 413.861C322.577 413.221 323.634 412.323 324.462 411.23C325.289 410.137 325.867 408.876 326.155 407.536C326.442 406.195 326.432 404.808 326.126 403.472C325.819 402.136 325.224 400.883 324.381 399.802L344.807 343.936L329.172 335.976L310.632 398.518C308.91 400.055 307.811 402.17 307.544 404.462C307.277 406.755 307.861 409.066 309.184 410.957C310.507 412.848 312.477 414.188 314.722 414.723C316.967 415.259 319.331 414.952 321.365 413.861V413.861Z"
                  fill="#FFB6B6"
                />
                <path
                  id="arm-left"
                  d="M341.102 242.503L318.312 341.605C318.092 342.629 318.283 343.698 318.843 344.583C319.403 345.468 320.288 346.098 321.307 346.338L343.255 349.5C343.795 349.627 344.356 349.64 344.901 349.539C345.447 349.438 345.965 349.224 346.423 348.912C346.882 348.599 347.27 348.195 347.564 347.724C347.858 347.253 348.05 346.727 348.13 346.178L354.807 242.936L341.102 242.503Z"
                  fill="#6C63FF"
                />
                <path
                  id="Vector_21"
                  d="M269.249 415.861C268.037 415.221 266.98 414.323 266.152 413.23C265.325 412.137 264.747 410.876 264.459 409.536C264.172 408.195 264.182 406.808 264.488 405.472C264.795 404.136 265.39 402.883 266.234 401.802L245.807 345.936L261.443 337.976L279.982 400.518C281.704 402.055 282.803 404.17 283.07 406.462C283.337 408.755 282.753 411.066 281.43 412.957C280.108 414.848 278.137 416.188 275.892 416.723C273.647 417.259 271.283 416.952 269.249 415.861V415.861Z"
                  fill="#FFB6B6"
                />
                <path
                  id="arm-right"
                  d="M249.512 244.503L272.302 343.605C272.522 344.629 272.331 345.698 271.771 346.583C271.211 347.468 270.326 348.098 269.307 348.338L247.359 351.5C246.819 351.627 246.259 351.64 245.713 351.539C245.168 351.438 244.649 351.224 244.191 350.912C243.732 350.599 243.344 350.195 243.05 349.724C242.756 349.253 242.564 348.727 242.485 348.178L233.807 244.936L249.512 244.503Z"
                  fill="#6C63FF"
                />
                <path
                  id="Vector_24"
                  d="M501.611 542.779L502.359 541.713C515.195 550.726 524.558 570.774 530.19 601.299C532.764 615.556 534.309 629.98 534.812 644.46L533.51 644.485C533.495 643.681 531.596 563.832 501.611 542.779Z"
                  fill="var(--neutral1)"
                />
                <path
                  id="Vector_25"
                  d="M503.564 600.389L504.312 599.324C517.692 608.718 518.506 642.706 518.534 644.148L517.232 644.174C517.225 643.827 516.405 609.405 503.564 600.389Z"
                  fill="var(--neutral1)"
                />
                <path
                  id="Vector_26"
                  d="M494.171 542.246C497.767 542.246 500.683 539.331 500.683 535.735C500.683 532.139 497.767 529.224 494.171 529.224C490.575 529.224 487.66 532.139 487.66 535.735C487.66 539.331 490.575 542.246 494.171 542.246Z"
                  fill="var(--neutral1)"
                />
                <path
                  id="Vector_27"
                  d="M497.427 598.894C501.023 598.894 503.938 595.979 503.938 592.383C503.938 588.787 501.023 585.871 497.427 585.871C493.831 585.871 490.916 588.787 490.916 592.383C490.916 595.979 493.831 598.894 497.427 598.894Z"
                  fill="var(--neutral1)"
                />
                <path
                  id="Vector_28"
                  d="M526.664 533.303C528.733 537.946 529.416 543.088 528.63 548.11C527.843 553.132 525.622 557.819 522.233 561.607C520.163 556.965 519.481 551.823 520.267 546.801C521.053 541.779 523.275 537.091 526.664 533.303Z"
                  fill="var(--neutral1)"
                />
                <path
                  id="Vector_29"
                  d="M486.807 557.132C491.739 555.904 496.922 556.127 501.73 557.777C506.538 559.426 510.767 562.43 513.907 566.428C508.974 567.656 503.792 567.432 498.984 565.783C494.176 564.134 489.947 561.13 486.807 557.132Z"
                  fill="var(--neutral1)"
                />
                <path
                  id="Vector_30"
                  d="M490.208 609.31C493.666 608.449 497.298 608.605 500.668 609.761C504.038 610.917 507.002 613.023 509.203 615.825C505.746 616.686 502.113 616.529 498.743 615.373C495.373 614.217 492.409 612.112 490.208 609.31V609.31Z"
                  fill="var(--neutral1)"
                />
                <g id="paper1-group">
                  <path
                    id="paper1"
                    d="M123.363 149.848C120.212 130.397 120.212 110.603 123.363 91.1518C123.563 89.9942 124.189 88.9415 125.129 88.1813C126.069 87.421 127.262 87.0024 128.497 87H176.807C177.59 86.9977 178.363 87.1651 179.067 87.4896C179.772 87.8141 180.389 88.2871 180.872 88.8726C181.366 89.466 181.71 90.1588 181.88 90.898C182.049 91.6371 182.039 92.4034 181.85 93.1383C177.331 111.127 177.331 129.873 181.85 147.862C182.039 148.597 182.049 149.363 181.88 150.102C181.71 150.841 181.366 151.534 180.872 152.127C180.389 152.713 179.772 153.186 179.067 153.51C178.363 153.835 177.59 154.002 176.807 154H128.497C127.262 153.998 126.069 153.579 125.129 152.819C124.189 152.058 123.563 151.006 123.363 149.848Z"
                    fill="#FF6584"
                  />
                  <path
                    id="Vector_32"
                    d="M162.323 116H136.677C135.702 115.999 134.768 115.602 134.078 114.896C133.389 114.19 133.001 113.233 133 112.235V110.765C133.001 109.767 133.389 108.81 134.078 108.104C134.768 107.398 135.702 107.001 136.677 107H162.323C163.298 107.001 164.232 107.398 164.922 108.104C165.611 108.81 165.999 109.767 166 110.765V112.235C165.999 113.233 165.611 114.19 164.922 114.896C164.232 115.602 163.298 115.999 162.323 116V116Z"
                    fill="white"
                  />
                  <path
                    id="Vector_33"
                    d="M162.323 130H136.677C135.702 129.999 134.768 129.602 134.078 128.896C133.389 128.19 133.001 127.234 133 126.236V124.764C133.001 123.766 133.389 122.81 134.078 122.104C134.768 121.398 135.702 121.001 136.677 121H162.323C163.298 121.001 164.232 121.398 164.922 122.104C165.611 122.81 165.999 123.766 166 124.764V126.236C165.999 127.234 165.611 128.19 164.922 128.896C164.232 129.602 163.298 129.999 162.323 130Z"
                    fill="white"
                  />
                </g>
                <g id="paper2-group">
                  <path
                    id="paper2"
                    d="M379.946 181.49C379.532 180.966 379.243 180.355 379.101 179.702C378.959 179.05 378.967 178.373 379.126 177.724C382.917 161.845 382.917 145.297 379.125 129.418C378.967 128.77 378.959 128.093 379.101 127.44C379.243 126.788 379.532 126.176 379.946 125.652C380.352 125.136 380.87 124.718 381.461 124.432C382.052 124.146 382.7 123.998 383.357 124H423.884C424.92 124.002 425.921 124.371 426.71 125.043C427.498 125.714 428.023 126.643 428.191 127.665C430.834 144.835 430.834 162.308 428.191 179.478C428.023 180.5 427.498 181.429 426.71 182.1C425.921 182.771 424.92 183.141 423.884 183.143H383.357C382.7 183.145 382.052 182.997 381.461 182.711C380.87 182.424 380.352 182.007 379.946 181.49V181.49Z"
                    fill="#6C63FF"
                  />
                  <path
                    id="Vector_35"
                    d="M416.063 145.822H394.714C393.918 145.821 393.156 145.505 392.594 144.942C392.031 144.38 391.715 143.617 391.714 142.822V141.548C391.715 140.752 392.031 139.99 392.594 139.427C393.156 138.865 393.918 138.549 394.714 138.548H416.063C416.859 138.549 417.621 138.865 418.184 139.427C418.746 139.99 419.062 140.752 419.063 141.548V142.822C419.062 143.617 418.746 144.38 418.184 144.942C417.621 145.505 416.859 145.821 416.063 145.822Z"
                    fill="white"
                  />
                  <path
                    id="Vector_36"
                    d="M416.063 158.369H394.714C393.918 158.368 393.156 158.052 392.594 157.49C392.031 156.927 391.715 156.165 391.714 155.369V154.095C391.715 153.3 392.031 152.537 392.594 151.975C393.156 151.412 393.918 151.096 394.714 151.095H416.063C416.859 151.096 417.621 151.412 418.184 151.975C418.746 152.537 419.062 153.3 419.063 154.095V155.369C419.062 156.165 418.746 156.927 418.184 157.49C417.621 158.052 416.859 158.368 416.063 158.369V158.369Z"
                    fill="white"
                  />
                </g>
                <g id="paper3-group">
                  <path
                    id="paper3"
                    d="M438.931 323.561C438.524 323.046 438.239 322.444 438.099 321.802C437.959 321.16 437.968 320.494 438.124 319.856C441.853 304.234 441.853 287.953 438.123 272.331C437.968 271.692 437.959 271.027 438.099 270.385C438.239 269.743 438.524 269.141 438.931 268.626C439.33 268.117 439.839 267.707 440.421 267.425C441.002 267.143 441.64 266.998 442.286 267H482.159C483.178 267.002 484.163 267.365 484.939 268.026C485.714 268.686 486.231 269.6 486.396 270.606C488.997 287.498 488.997 304.689 486.396 321.581C486.231 322.587 485.714 323.501 484.939 324.161C484.163 324.821 483.178 325.185 482.159 325.187H442.286C441.64 325.189 441.002 325.043 440.421 324.762C439.839 324.48 439.33 324.069 438.931 323.561V323.561Z"
                    fill="#E6E6E6"
                  />
                  <path
                    id="Vector_38"
                    d="M473.958 286.426H453.035C452.239 286.425 451.477 286.109 450.914 285.547C450.352 284.984 450.036 284.222 450.035 283.426V282.254C450.036 281.458 450.352 280.696 450.914 280.133C451.477 279.571 452.239 279.255 453.035 279.254H473.958C474.753 279.255 475.516 279.571 476.078 280.133C476.641 280.696 476.957 281.458 476.958 282.254V283.426C476.957 284.222 476.641 284.984 476.078 285.547C475.516 286.109 474.753 286.425 473.958 286.426Z"
                    fill="white"
                  />
                  <path
                    id="Vector_39"
                    d="M473.958 301.24H453.035C452.239 301.239 451.477 300.922 450.914 300.36C450.352 299.798 450.036 299.035 450.035 298.24V297.067C450.036 296.272 450.352 295.509 450.914 294.947C451.477 294.384 452.239 294.068 453.035 294.067H473.958C474.753 294.068 475.516 294.384 476.078 294.947C476.641 295.509 476.957 296.272 476.958 297.067V298.24C476.957 299.035 476.641 299.798 476.078 300.36C475.516 300.922 474.753 301.239 473.958 301.24Z"
                    fill="white"
                  />
                  <path
                    id="Vector_40"
                    d="M473.958 316.053H453.035C452.239 316.052 451.477 315.736 450.914 315.173C450.352 314.611 450.036 313.848 450.035 313.053V311.881C450.036 311.085 450.352 310.323 450.914 309.76C451.477 309.198 452.239 308.882 453.035 308.881H473.958C474.753 308.882 475.516 309.198 476.078 309.76C476.641 310.323 476.957 311.085 476.958 311.881V313.053C476.957 313.848 476.641 314.611 476.078 315.173C475.516 315.736 474.753 316.052 473.958 316.053V316.053Z"
                    fill="white"
                  />
                </g>
                <g id="paper4-group">
                  <path
                    id="paper4"
                    d="M117.951 290.581C115.35 273.689 115.35 256.498 117.951 239.606C118.115 238.6 118.632 237.686 119.408 237.026C120.184 236.365 121.169 236.002 122.187 236H162.06C162.706 235.998 163.344 236.143 163.926 236.425C164.507 236.707 165.017 237.118 165.415 237.626C165.823 238.142 166.107 238.743 166.247 239.385C166.387 240.027 166.379 240.693 166.223 241.331C162.493 256.953 162.493 273.234 166.222 288.856C166.379 289.494 166.387 290.16 166.247 290.802C166.107 291.444 165.823 292.045 165.415 292.561C165.017 293.069 164.507 293.48 163.926 293.762C163.344 294.043 162.706 294.189 162.06 294.187H122.187C121.169 294.185 120.184 293.821 119.408 293.161C118.632 292.501 118.115 291.586 117.951 290.581V290.581Z"
                    fill="#6C63FF"
                  />
                  <path
                    id="Vector_42"
                    d="M151.646 262.929H130.723C129.927 262.928 129.165 262.611 128.602 262.049C128.04 261.487 127.724 260.724 127.723 259.929V258.756C127.724 257.961 128.04 257.198 128.602 256.636C129.165 256.074 129.927 255.757 130.723 255.756H151.646C152.442 255.757 153.204 256.074 153.767 256.636C154.329 257.198 154.645 257.961 154.646 258.756V259.929C154.645 260.724 154.329 261.487 153.767 262.049C153.204 262.611 152.442 262.928 151.646 262.929Z"
                    fill="white"
                  />
                </g>
                <g id="paper5-group">
                  <path
                    id="paper5"
                    d="M289.931 70.5605C289.523 70.0451 289.239 69.4435 289.099 68.8016C288.959 68.1596 288.968 67.4942 289.124 66.856C292.853 51.2338 292.853 34.953 289.124 19.3308C288.968 18.6926 288.959 18.0272 289.099 17.3852C289.239 16.7433 289.523 16.1417 289.931 15.6263C290.33 15.1178 290.839 14.707 291.42 14.4252C292.002 14.1434 292.64 13.998 293.286 14H333.159C334.177 14.0021 335.162 14.3656 335.938 15.0259C336.714 15.6862 337.231 16.6003 337.396 17.6057C339.997 34.498 339.997 51.6888 337.396 68.5811C337.231 69.5864 336.714 70.5006 335.938 71.1609C335.162 71.8212 334.177 72.1847 333.159 72.1868H293.286C292.64 72.1888 292.002 72.0434 291.42 71.7616C290.839 71.4798 290.33 71.069 289.931 70.5605Z"
                    fill="#E6E6E6"
                  />
                  <path
                    id="Vector_44"
                    d="M325.136 35.895H304.213C303.418 35.8942 302.655 35.5778 302.093 35.0154C301.53 34.453 301.214 33.6904 301.213 32.895V31.7227C301.214 30.9273 301.53 30.1647 302.093 29.6023C302.655 29.0399 303.418 28.7235 304.213 28.7227H325.136C325.932 28.7235 326.694 29.0399 327.257 29.6023C327.819 30.1647 328.135 30.9273 328.136 31.7227V32.895C328.135 33.6904 327.819 34.453 327.257 35.0154C326.694 35.5778 325.932 35.8942 325.136 35.895V35.895Z"
                    fill="white"
                  />
                </g>
              </g>
              <defs>
                <clipPath id="clip0">
                  <rect width="590.819" height="646.936" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </div>
          <div className="paint"></div>
        </div>
  );
}

export default Projects;
