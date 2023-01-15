### 新旧站路由变化

```conf
; 编辑详细
^/subject/(\w+)/edit_tail /subject/$1/wiki/edit_tail
; 修订历史
^/subject/(\w+)/edit /subject/$1/wiki/history
; 新增封面
^/subject/(\w+)/upload_img /subject/$1/wiki/upload_img
; 关联角色
^/subject/(\w+)/add_related/character /subject/$1/wiki/relate_character
; 关联人物
^/subject/(\w+)/add_related/person /subject/$1/wiki/relate_person
; 关联条目
^/subject/(\w+)/add_related/person /subject/$1/wiki/relate_subject
```
