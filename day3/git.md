#### git:Git(读音为/gɪt/。)是一个开源的分布式版本控制系统，可以有效、高速地处理从很小到非常大的项目版本管理。

#### svn  开源的集中式

#### svn和git的区别：

svn的版本库集中存放在服务器，会影响工作

git本地和服务器都有版本库，不会影响工作

#### git 相关的命令

git config --gloabl username xxx

git config --gloabl email xxx@163.com

git init  初始化本地版本库

git status  查看工作区和暂存区的状态

git log  查看提交记录

git reflog  查看所有的提交记录

git diff 查看工作区具体的修改

git diff --cached  查看暂存区具体的修改

>撤销

1>撤销工作区修改

git checkout -- <文件路径>

2>撤销暂存区修改

    1)git reset <文件路径>   把修改从暂存区回退到工作区

    2)git checkout -- <文件路径>

3>回滚

    git reset --hard HEAD^  回退一个版本  ^^ ^^^  

    git reset --hard <commit_id>  回退到指定版本







