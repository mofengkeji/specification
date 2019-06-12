# RESTful API Specification
RESTFul(**Representational State Transfer**) 是一种技术风格，大概是定义了通信框架定义时的一些约束条件和原则，应用到HTTP通信协议上时强调的就是URI的语义化，自我描述性，调用者能够从URI上清楚地识别出该API所具有的功能以及可能产生的副作用。

## Version：版本（Must）
URI中包含版本号能够帮助我们更好的进行版本控制，通常API版本号指的是形如：v1.2.3中的1，并且版本号更高的API是不会向下兼容的，此处version允许的取值是：v{n}, 其中n是大于等于1的整数
- URI Template
> /{version}/

- Example
> /v1/

## Namespaces：命名空间（Maybe）
命名空间可用来区分不同功能板块的API集合，根据项目具体的情况可以赋予它其他的含义，并且他在URI中不是必须的
- URI Template
> /{version}/{namespace}/

- Example
> /v1/employment/
> 
>/v1/application/

## Resouce：资源（Must）
 如下的URI模版表示了对一个资源的访问或操作, 其中resource不一定要为复数形式

- URI Template

> /{version}/{namespace}/{resource}

- Example

> /v1/namespace-a/books

如果指定id，则表示对集合资源中的特定实例进行访问或操作

- URI Template
  
> /{version}/{namespace}/{resource}/{resourceId}

- Example

> /v1/namespace-a/books/767182735

特殊情况，当在客户端遇到获取当前用户信息或者当前用户的某些操作，此时可用me代替resourceId

- URI Template
  
> /{version}/{namespace}/{resource}/me

- Example

> /v1/namespace-a/users/me

如果操作的资源始终是只有一个对象，resourceId也可以省略


### CRUD (Create Read Update Delete)
以下是对一般形式的API操作的基本约束条件   
| Method | Usage  | Idempotent:幂等性 |              Notes |
| :----- | :----: | :---------------: | -----------------: |
| GET    |  Read  |         N         | 获取单个或多个资源 |
| POST   | Create |         N         |           创建资源 |
| PUT    | Update |         N         |           全量更新 |
| PATCH  | Update |         Y         |           部分更新 |
| DELETE | Delete |         Y         |               删除 |

### Collection：集合资源
针对集合资源的查询，这里作出特殊说明
#### 无分页
- URI Template
> GET /{version}/{namespace}/{resource}

#### 分页
- URI Template
> POST /{version}/{namespace}/{resource}/search

- Request Page Parameter

分页操作的请求必须包含以下变量

| PropertyName |  Type   | Notes                                        |
| :----------- | :-----: | :------------------------------------------- |
| offset       | integer | 偏移量                                       |
| page         | integer | 页码，从1开始                                |
| size         | integer | 每页条数                                     |
| unpaged      | boolean | 是否不分页                                   |
| sort         | string  | 排序参数，形如sort=name1,DESC&sort=name2,ASC |


- Response Page Parameter

分页操作的响应必须包含以下变量

| PropertyName     |  Type   | Notes        |
| :--------------- | :-----: | :----------- |
| hasContent       | boolean | 是否有内容   |
| hasNext          | boolean | 是否有下一条 |
| hasPrevious      | boolean | 是否有前一条 |
| number           | integer | 当前页码     |
| numberOfElements | integer | 当前页总条数 |
| size             | integer | 当前页面大小 |
| totalElements    | integer | 总条数       |
| totalPages       | integer | 总页数       |


### Complex Operation：复杂操作（非增删改查）
- URI Template
> POST /{version}/{namespace}/{resource}/{resourceId}/{action}

- Example
> POST /v1/namespace-a/card/123/bind

> POST /v1/namespace-a/job/123/interview

> POST /v1/namespace-a/user/me/register
> 
> POST /v1/namespace-a/user/me/login
> 
> POST /v1/namespace-a/user/me/logout