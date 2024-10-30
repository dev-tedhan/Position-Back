create table tbl_notice_category(
    id bigint unsigned auto_increment primary key ,
    notice_category_id int not null,
    notice_id bigint unsigned not null ,
    constraint fk_notice_category_notice_id foreign key (notice_id)
                                references tbl_notice(id)
);

select *
from tbl_notice_category;