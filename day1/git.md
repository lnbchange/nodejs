## 第一种：先创建github仓库

1. git clone https://***
2. 你编辑你的代码，创建新的文件
3. git add ./  或者是 git add 1.txt
4. git commit -m   ***    注释语句
5. git push    提交

## 第二种：先在本地创建个仓库

1. git init
2. git add README.md
3. git commit -m "first commit"
4. git remote add origin https://github.com/123844114/werwerw.git
5. git push -u origin master

**git常见的指令**

git init    初始化 
git add
git commit
git push
git pull
git clone
git status
git stash

**创建分支并关联远端**
git checkout branch -b 分支名

**切换分支**
git checkout 分支名

**查看分支**
git branch

**合并分支**

git checkout merge 分支名

**删除本地分支**

git branch -d 分支名

**删除远端分支**
git push origin --delete 分支名





